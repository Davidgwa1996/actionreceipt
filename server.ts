import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { dbStore } from './server/dbStore';
import { notificationService } from './server/notificationService';
import { evaluatePurchasePolicy } from './server/policyEngine';
import {
  runTransactionAgent,
  runLiveCheckAgent,
  runTruthChainAgent,
  runPackCheckAgent,
  runReceiptAnalysisAgent,
  runPurchaseOrchestratorAgent,
  runPricingProtectionAgent
} from './server/geminiAgents';

import { calculatePricing } from './src/utils/pricingEngine';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      app: 'ActionReceipt',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // 2. Transactions API
  app.get('/api/transactions', (_req, res) => {
    res.json(dbStore.getAllTransactions());
  });

  app.get('/api/transactions/:id', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }
    res.json(tx);
  });

  app.post('/api/transactions', async (req, res) => {
    try {
      const { itemTitle, itemPrice, description, listingUrl, sellerName, sellerType, companyName } = req.body;
      if (!itemTitle || !itemPrice) {
        res.status(400).json({ error: 'itemTitle and itemPrice are required' });
        return;
      }

      const tx = dbStore.createTransaction({
        itemTitle,
        itemPrice: Number(itemPrice),
        description: description || '',
        listingUrl,
        sellerName,
        sellerType,
        companyName,
        sellerIntegrationStatus: req.body.sellerIntegrationStatus,
        feeFundingMode: req.body.feeFundingMode
      });

      // Run Gemini Transaction Agent
      const agentResult = await runTransactionAgent(itemTitle, Number(itemPrice), description || '');
      tx.riskTier = agentResult.riskTier;
      tx.itemCategory = agentResult.recommendedCategory;
      tx.agentLogs.push(agentResult.agentLog);

      dbStore.updateTransaction(tx.id, tx);
      res.status(201).json(tx);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create transaction' });
    }
  });

  // 3. Seller Verification API
  app.post('/api/transactions/:id/verify-seller', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const { fullName, type, governmentIdType, companyName, companyNumber } = req.body;

    tx.seller = {
      ...tx.seller,
      fullName: fullName || tx.seller.fullName,
      type: type || tx.seller.type,
      identityConfirmed: true,
      livenessConfirmed: true,
      phoneVerified: true,
      emailVerified: true,
      addressCheckConfirmed: true,
      governmentIdType: governmentIdType || 'Passport',
      companyName: companyName || tx.seller.companyName,
      companyNumber: companyNumber || tx.seller.companyNumber,
      registryActive: true,
      representativeAuthorityConfirmed: true
    };

    tx.state = 'SELLER_ID_CONFIRMED';
    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  // 3b. Seller Fee Decision / Refusal
  app.post('/api/transactions/:id/seller-fee-decision', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const { acceptFee } = req.body;
    const pricing = calculatePricing(tx.itemPrice, tx.currency || 'GBP');
    const fee = pricing.protectionFee;

    if (acceptFee) {
      tx.sellerFeeAccepted = true;
      tx.feeFundingMode = 'SELLER_FUNDED';
      tx.financials.platformFee = fee;
      tx.financials.sellerNet = parseFloat((tx.itemPrice - fee).toFixed(2));
    } else {
      tx.sellerFeeAccepted = false;
      // Pending buyer fee decision
    }
    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  app.post('/api/transactions/:id/buyer-fee-decision', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const { buyerPaysFee } = req.body;
    const pricing = calculatePricing(tx.itemPrice, tx.currency || 'GBP');
    const fee = pricing.protectionFee;

    if (buyerPaysFee) {
      tx.feeFundingMode = 'BUYER_FUNDED';
      tx.financials.platformFee = fee;
      tx.financials.grossAmount = parseFloat((tx.itemPrice + fee).toFixed(2));
      tx.financials.sellerNet = tx.itemPrice;
    } else {
      tx.state = 'BLOCKED';
    }
    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  app.post('/api/transactions/:id/seller-refuse', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    tx.sellerRefusedVerification = true;
    tx.state = 'BLOCKED';
    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  // 4. Payout Beneficiary API
  app.post('/api/transactions/:id/verify-payout', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const { beneficiaryName, bankName, accountEnding } = req.body;
    const matched = beneficiaryName.toLowerCase().trim() === tx.seller.fullName.toLowerCase().trim();

    tx.payout = {
      beneficiaryName,
      bankName: bankName || 'Standard Bank',
      accountEnding: accountEnding || '1234',
      payoutMatchedToSeller: matched,
      mismatchReason: matched ? undefined : `Beneficiary name "${beneficiaryName}" does not match verified seller identity "${tx.seller.fullName}".`
    };

    tx.state = matched ? 'PAYOUT_CONFIRMED' : 'BLOCKED';
    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  // 5. LiveCheck API
  app.post('/api/transactions/:id/livecheck/challenge', async (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const token = `AR-TOKEN-${Math.floor(1000 + Math.random() * 9000)}`;
    const result = await runLiveCheckAgent(tx.itemTitle, token);

    tx.liveCheck = {
      id: `LC-${Date.now()}`,
      oneTimeToken: token,
      requiredGestures: result.requiredGestures,
      productSpecificInstructions: result.productSpecificInstructions,
      timestamp: new Date().toISOString(),
      status: 'PENDING'
    };

    tx.agentLogs.push(result.agentLog);
    tx.state = 'PRODUCT_LIVECHECK_PENDING';
    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  app.post('/api/transactions/:id/livecheck/verify', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx || !tx.liveCheck) {
      res.status(400).json({ error: 'LiveCheck challenge not found for transaction' });
      return;
    }

    const { pass, evidencePhotos } = req.body;
    tx.liveCheck.status = pass ? 'PASS' : 'FAIL';
    tx.liveCheck.evidencePhotos = evidencePhotos || [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
    ];

    if (pass) {
      tx.state = 'PRODUCT_LIVECHECK_PASS';
      tx.assetFingerprint = {
        id: `FP-${tx.id}`,
        brand: tx.itemTitle.split(' ')[0] || 'Generic',
        model: tx.itemTitle,
        serialNumber: `SN-${Math.floor(100000 + Math.random() * 900000)}`,
        visualDescriptors: ['Verified condition', 'Live token captured'],
        uniqueMarks: ['Clear serial identifier'],
        createdAt: new Date().toISOString()
      };
    } else {
      tx.state = 'PRODUCT_LIVECHECK_FAIL';
    }

    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  // 6. Multi-Agent Engine & Deterministic Purchase Policy Engine
  app.post('/api/transactions/:id/truthchain', async (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    // Run Full 7-Agent Trust Engine Orchestrator
    const orchestratorRes = await runPurchaseOrchestratorAgent({
      transactionId: tx.id,
      product: tx.itemTitle,
      price: tx.itemPrice,
      seller: tx.seller.fullName,
      sellerType: tx.seller.type,
      marketplace: 'ActionReceipt Verified Network',
      payoutBeneficiary: tx.payout.beneficiaryName
    });

    // Add agent logs to transaction
    orchestratorRes.agentLogs.forEach((log) => {
      tx.agentLogs.push(log);
    });

    tx.truthChainSummary = {
      consistent: orchestratorRes.truthChainResult.consistent,
      contradictions: orchestratorRes.truthChainResult.contradictions || [],
      riskScore: orchestratorRes.truthChainResult.riskScore || 0.02
    };

    // Evaluate Deterministic Purchase Policy Engine
    const policyResult = evaluatePurchasePolicy(tx);
    tx.purchasePolicyResult = policyResult;

    if (policyResult.passed) {
      tx.state = 'PURCHASE_VERIFIED';
    } else {
      tx.state = 'PURCHASE_BLOCKED';
    }

    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  // 7. Payment Execution & Order Placed
  app.post('/api/transactions/:id/payment', (req, res) => {
    const { paymentMethod } = req.body;
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    // Enforce Deterministic Policy Engine evaluation
    const policyCheck = evaluatePurchasePolicy(tx);
    if (!policyCheck.passed && tx.state !== 'PURCHASE_VERIFIED' && tx.state !== 'READY_FOR_FUNDING') {
      res.status(403).json({
        error: 'PURCHASE_VERIFIED state required. Deterministic Policy Engine blocked authorization.',
        policyViolations: policyCheck.policyViolations
      });
      return;
    }

    const updated = dbStore.recordPaymentSuccess(req.params.id, paymentMethod || 'Google Pay');
    if (updated) {
      updated.state = 'ORDER_PLACED';
      dbStore.updateTransaction(updated.id, updated);
    }
    
    // Auto trigger automated email summary notification
    try {
      if (updated && notificationService.getSettings().autoSendOnVerification) {
        notificationService.sendAutomatedEmailSummary(updated);
      }
    } catch (err) {
      console.warn('Auto notification dispatch warning:', err);
    }

    res.json(updated || tx);
  });

  // 7b. Notification Service Integration API
  app.get('/api/notifications/settings', (_req, res) => {
    res.json(notificationService.getSettings());
  });

  app.post('/api/notifications/settings', (req, res) => {
    const updated = notificationService.updateSettings(req.body);
    res.json(updated);
  });

  app.get('/api/notifications/logs', (_req, res) => {
    res.json(notificationService.getLogs());
  });

  app.post('/api/notifications/send-summary', (req, res) => {
    const { transactionId, recipientEmail } = req.body;
    const tx = dbStore.getTransactionById(transactionId || 'TX-MSQ-882190');
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const emailLog = notificationService.sendAutomatedEmailSummary(tx, recipientEmail);
    res.json({
      status: 'SUCCESS',
      message: `Automated email summary dispatched to ${emailLog.recipientEmail}`,
      log: emailLog
    });
  });

  // 7c. Receipt Analysis API (Gemini Multimodal Vision)
  app.post('/api/analyze-receipt', async (req, res) => {
    try {
      const { imageBase64, expectedMerchant, expectedTotal, expectedCurrency } = req.body;
      if (!imageBase64) {
        res.status(400).json({ error: 'imageBase64 field is required' });
        return;
      }

      const result = await runReceiptAnalysisAgent({
        imageBase64,
        expectedMerchant,
        expectedTotal: expectedTotal ? Number(expectedTotal) : undefined,
        expectedCurrency
      });

      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Receipt analysis failed' });
    }
  });

  // 8. PackCheck & Carrier API
  app.post('/api/transactions/:id/packcheck', async (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const result = await runPackCheckAgent(tx.itemTitle, tx.assetFingerprint?.serialNumber);
    tx.agentLogs.push(result.agentLog);

    tx.packagePassport = {
      packageId: `PKG-UK-${Math.floor(100000 + Math.random() * 900000)}`,
      assetFingerprintId: tx.assetFingerprint?.id || `FP-${tx.id}`,
      sealId: result.packageSealId,
      itemMatched: true,
      boxCondition: 'Verified sealed box',
      shippingLabelMatched: true,
      verifiedAt: new Date().toISOString()
    };

    tx.state = 'PACKCHECK_CONFIRMED';

    // Auto initialize carrier tracking
    tx.carrier = {
      carrierName: 'Royal Mail Express Tracked',
      trackingNumber: `GB${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      status: 'CUSTODY_CONFIRMED',
      events: [
        {
          timestamp: new Date().toISOString(),
          location: 'Depot London',
          event: 'Package received into carrier custody'
        }
      ]
    };

    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  app.post('/api/transactions/:id/accept-delivery', (req, res) => {
    const tx = dbStore.getTransactionById(req.params.id);
    if (!tx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const now = new Date().toISOString();
    tx.state = 'ACCEPTED';
    tx.financials.settledAt = now;
    if (tx.carrier) {
      tx.carrier.status = 'DELIVERED';
      tx.carrier.events.push({
        timestamp: now,
        location: 'Buyer Destination',
        event: 'Delivered and accepted by buyer'
      });
    }

    dbStore.updateTransaction(tx.id, tx);
    res.json(tx);
  });

  // 9. Simulator API Endpoint
  app.post('/api/agent/run-simulator', async (req, res) => {
    try {
      const { mode, itemTitle, itemPrice, sellerName, payoutBeneficiary } = req.body;
      const isScam = mode === 'SCAM_ATTEMPT';

      const title = itemTitle || (isScam ? 'MacBook Pro 16" M3 Max 36GB - Space Black' : 'Apple iPhone 15 Pro Max 256GB');
      const price = itemPrice || (isScam ? 2400 : 650);
      const seller = sellerName || (isScam ? 'Viktor Krum' : 'Sarah Jenkins');
      const beneficiary = payoutBeneficiary || (isScam ? 'Offshore Digital Services Ltd' : 'Sarah Jenkins');

      // Run agents in sequence
      const txAgentResult = await runTransactionAgent(title, price, 'Simulator test transaction');
      const token = `AR-TOKEN-${Math.floor(1000 + Math.random() * 9000)}`;
      const liveCheckResult = await runLiveCheckAgent(title, token);

      const liveCheckPass = !isScam;
      const payoutMatched = !isScam;

      const truthChainResult = await runTruthChainAgent({
        sellerName: seller,
        sellerType: isScam ? 'INDIVIDUAL' : 'SOLE_TRADER',
        payoutBeneficiary: beneficiary,
        payoutMatched,
        liveCheckPassed: liveCheckPass,
        isScamSimulation: isScam
      });

      const logs = [
        txAgentResult.agentLog,
        liveCheckResult.agentLog,
        truthChainResult.agentLog
      ];

      res.json({
        mode,
        itemTitle: title,
        itemPrice: price,
        sellerName: seller,
        payoutBeneficiary: beneficiary,
        truthChainStatus: truthChainResult.resultStatus,
        consistent: truthChainResult.consistent,
        contradictions: truthChainResult.contradictions,
        finalState: truthChainResult.consistent ? 'READY_FOR_FUNDING' : 'PROTECTED_PAYMENT_DISABLED',
        agentLogs: logs
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Simulator execution failed' });
    }
  });

  // 10. Operations & Metrics API
  app.get('/api/ops/metrics', (_req, res) => {
    res.json(dbStore.getMetrics());
  });

  app.get('/api/ops/pnl', (_req, res) => {
    res.json(dbStore.getPnL());
  });

  app.get('/api/ops/customer-evidence', (_req, res) => {
    res.json(dbStore.getCustomerEvidence());
  });

  app.get('/api/ops/release-gates', (_req, res) => {
    res.json(dbStore.getReleaseGates());
  });

  // Serve static assets from public directory
  const publicDirPath = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDirPath)) {
    fs.mkdirSync(publicDirPath, { recursive: true });
  }

  // Intercept all media (.mp4, .webm) and download routes BEFORE any static or Vite middlewares
  const handleMediaOrDownloadRequest = (req: express.Request, res: express.Response) => {
    try {
      let filename = '';
      let isAttachment = false;

      if (req.path === '/download' || req.path === '/api/download-demo-video') {
        const format = req.query.format === 'webm' ? 'webm' : 'mp4';
        filename = `ActionReceipt_3Min_Demo_Video_1080p.${format}`;
        isAttachment = true;
      } else {
        filename = path.basename(req.path);
        isAttachment = req.query.download === 'true';
      }

      const filePath = path.join(publicDirPath, filename);

      if (!fs.existsSync(filePath)) {
        console.warn(`[MEDIA ROUTE WARN] File not found: ${filePath}`);
        return res.status(404).json({
          available: false,
          error: `Video asset '${filename}' was not found on the server.`
        });
      }

      const ext = path.extname(filePath).toLowerCase();
      const mimeType = ext === '.webm' ? 'video/webm' : (ext === '.mp4' ? 'video/mp4' : 'application/octet-stream');
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;

      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type, Authorization');
      res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Content-Disposition');
      res.setHeader('Accept-Ranges', 'bytes');

      const range = req.headers.range;

      if (range && !isAttachment) {
        // Handle Range requests for video streaming
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        
        // CRITICAL FIX: Cap chunks to 10MB to prevent Cloud Run 32MB limit HTTP 500 crashes
        const MAX_CHUNK_SIZE = 10 * 1024 * 1024; 
        const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + MAX_CHUNK_SIZE, fileSize - 1);

        if (start >= fileSize || end >= fileSize) {
          res.status(416).setHeader('Content-Range', `bytes */${fileSize}`);
          return res.end();
        }

        const chunksize = (end - start) + 1;
        res.status(206);
        res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
        res.setHeader('Content-Length', chunksize.toString());
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

        const stream = fs.createReadStream(filePath, { start, end });
        stream.on('error', (err: any) => {
           if (err.code !== 'EPIPE' && err.code !== 'ECONNRESET') {
             console.error('[STREAM ERROR]', err);
           }
           if (!res.headersSent) res.status(500).end();
        });
        stream.pipe(res);
        return;
      } else {
        // Full file download (Attachment or full load without Range)
        // CRITICAL FIX: We DELIBERATELY omit Content-Length to force Transfer-Encoding: chunked.
        // This completely bypasses Cloud Run's 32MB synchronous response limit.
        res.status(200);
        res.setHeader('Content-Type', isAttachment ? 'application/octet-stream' : mimeType);
        res.setHeader('Content-Disposition', isAttachment ? `attachment; filename="${filename}"` : `inline; filename="${filename}"`);

        const stream = fs.createReadStream(filePath);
        stream.on('error', (err: any) => {
           if (err.code !== 'EPIPE' && err.code !== 'ECONNRESET') {
             console.error('[DOWNLOAD STREAM ERROR]', err);
           }
           if (!res.headersSent) res.status(500).end();
        });
        stream.pipe(res);
        return;
      }
    } catch (err: any) {
      console.error('[MEDIA ROUTE EXCEPTION]:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal server error during media request', details: err.message });
      }
    }
  };

  // Dedicated routes for downloads
  app.get('/download', handleMediaOrDownloadRequest);
  app.get('/api/download-demo-video', handleMediaOrDownloadRequest);

  // Intercept any direct .mp4 or .webm requests to serve directly via Express (preventing Vite 500 errors)
  app.use((req, res, next) => {
    const urlPath = req.path.toLowerCase();
    if (urlPath.endsWith('.mp4') || urlPath.endsWith('.webm')) {
      return handleMediaOrDownloadRequest(req, res);
    }
    next();
  });

  app.use(express.static(publicDirPath));

  // Download Health Check Endpoint
  app.get('/api/download-health', (req, res) => {
    try {
      const format = req.query.format === 'webm' ? 'webm' : 'mp4';
      const filename = `ActionReceipt_3Min_Demo_Video_1080p.${format}`;
      const filePath = path.join(publicDirPath, filename);

      if (!fs.existsSync(filePath)) {
        return res.json({
          available: false,
          message: `Video asset (${filename}) is currently being prepared. Please try again shortly.`,
          filename
        });
      }

      const stat = fs.statSync(filePath);
      if (stat.size < 1000) {
        return res.json({
          available: false,
          message: `Video asset (${filename}) is incomplete. Please wait for build completion.`,
          filename
        });
      }

      return res.json({
        available: true,
        filename,
        size: stat.size,
        formattedSize: `${(stat.size / (1024 * 1024)).toFixed(1)} MB`,
        contentType: 'application/octet-stream'
      });
    } catch (err: any) {
      console.error('[DOWNLOAD HEALTH CHECK ERROR]:', err);
      return res.status(500).json({
        available: false,
        message: 'Unable to check video asset availability.',
        error: err.message
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ActionReceipt Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

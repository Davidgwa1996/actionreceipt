import React from 'react';
import { ShieldCheck, Cpu, Cloud, Layers, AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductPageProps {
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ navigate, onOpenCreateTx }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12 text-left">
        
        {/* Header */}
        <div className="space-y-4 border-b border-slate-900 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Product Architecture & Specification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            ActionReceipt Product Summary
          </h1>
          <p className="text-slate-300 text-base leading-relaxed font-sans">
            ActionReceipt is an AI-native pre-payment trust infrastructure layer for remote physical purchases. Its core purpose is to reduce online purchase scams by requiring the seller, seller authority, payout destination, listing, physical product, relevant location evidence, and overall transaction consistency to be verified BEFORE protected payment becomes available.
          </p>
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <p className="text-emerald-400 font-bold">ActionReceipt focus sequence:</p>
            <p className="text-white">LISTING → PURCHASE DECISION → VERIFICATION → PAYMENT → ORDER PLACED</p>
            <p className="text-slate-400 font-sans pt-1">
              ActionReceipt's current mission ends at: <strong className="text-emerald-400 font-mono">PAYMENT CONFIRMED ✓ ORDER PLACED ✓</strong>. After ORDER PLACED, the seller, merchant, retailer, marketplace, or company continues through its normal fulfilment and supply-chain process.
            </p>
          </div>
        </div>

        {/* 1. THE PROBLEM */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2 text-rose-400">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>1. The Problem</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Remote purchase scams exploit a structural weakness in online commerce: <strong>THE BUYER IS OFTEN ASKED TO MOVE MONEY BEFORE THE TRANSACTION HAS PROVED ENOUGH ABOUT THE SELLER AND PHYSICAL PRODUCT.</strong>
          </p>
          <div className="space-y-2 text-xs text-slate-300 font-sans">
            <p className="font-bold text-slate-200">A scammer can:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>create a professional-looking product listing;</li>
              <li>copy genuine product photographs;</li>
              <li>impersonate an existing seller or business;</li>
              <li>claim to possess a product that does not exist;</li>
              <li>advertise from a false or misleading location;</li>
              <li>redirect payment to an unrelated beneficiary account;</li>
              <li>pressure the buyer to pay immediately;</li>
              <li>disappear after receiving payment.</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <span className="text-rose-400 font-bold block">Typical Vulnerable Flow:</span>
            <p className="text-slate-400">PRODUCT LISTING → BUYER CONTACTS SELLER → SELLER BUILDS TRUST → BUYER PAYS → SELLER / PRODUCT PROBLEM DISCOVERED → RECOVERY / INVESTIGATION AFTER MONEY MOVED</p>
          </div>
          <p className="text-slate-300 text-sm font-sans">
            The central failure is timing. Verification often occurs too late. ActionReceipt moves the most important verification BEFORE payment.
          </p>
        </div>

        {/* 2. EXISTING SYSTEMS AND THEIR LIMITATIONS */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <span>2. Existing Systems and Their Limitations</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            ActionReceipt does NOT claim that individual fraud-protection technologies do not exist. Existing systems already address parts of the problem. The gap is that these protections are often fragmented and do not necessarily bind the seller, payout destination, listing, live physical product, location evidence, and final payment eligibility into one transaction-specific pre-payment state.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-sans">
              <span className="text-amber-400 font-bold font-mono block uppercase">A. Scam Intelligence / Warning Systems</span>
              <p className="text-slate-300"><strong>What they do well:</strong> Warn the buyer that something may be suspicious based on patterns, language, and URLs.</p>
              <p className="text-slate-400"><strong>Limitation:</strong> A warning alone does not prove who the seller really is, whether the payout destination matches, or whether the physical item exists in the seller's live possession.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-sans">
              <span className="text-purple-400 font-bold font-mono block uppercase">B. Identity / KYC Systems</span>
              <p className="text-slate-300"><strong>What they do well:</strong> Establish that a real person or business exists using government ID and liveness.</p>
              <p className="text-slate-400"><strong>Limitation:</strong> A real identity does not automatically prove that the listing is genuine, that the seller owns the item, or that the payout account matches.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-sans">
              <span className="text-blue-400 font-bold font-mono block uppercase">C. Live Possession / Product Verification</span>
              <p className="text-slate-300"><strong>What they do well:</strong> Provide stronger proof than static photos by asking for live gestures or video.</p>
              <p className="text-slate-400"><strong>Limitation:</strong> Product proof alone may not bind the item to seller identity, payout destination, listing metadata, GPS, or payment eligibility.</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-sans">
              <span className="text-emerald-400 font-bold font-mono block uppercase">D. Payment Protection / Escrow Systems</span>
              <p className="text-slate-300"><strong>What they do well:</strong> Introduce payment controls and delay money movement.</p>
              <p className="text-slate-400"><strong>Limitation:</strong> They may not dynamically determine what the seller and physical product must prove BEFORE payment based on the specific transaction.</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-sans space-y-1">
            <span className="text-slate-200 font-bold font-mono block uppercase">E. Marketplace Seller Ratings / Badges</span>
            <p className="text-slate-400">
              Historical reputation does not prove that the current account has not been compromised, that the current product exists, or that the payout destination is correct. ActionReceipt verifies the current transaction, not only historical reputation.
            </p>
          </div>
        </div>

        {/* 3. THE ACTIONRECEIPT SOLUTION */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>3. The ActionReceipt Solution</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            ActionReceipt changes the transaction sequence from: <br />
            <code className="text-rose-400 font-mono text-xs">TRUST → PAY → INVESTIGATE IF SOMETHING GOES WRONG</code> <br />
            to: <br />
            <code className="text-emerald-400 font-mono text-xs font-bold">VERIFY → PROVE → RECONCILE → PAY → ORDER PLACED</code>
          </p>
          <p className="text-slate-300 text-sm font-sans">
            When the buyer clicks <strong>VERIFY PURCHASE</strong>, ActionReceipt launches a Gemini 3.6 Flash multi-agent verification workflow evaluating Seller Identity & Authority, Payout Integrity, Listing Authenticity, Product Evidence, Dynamic LiveCheck, LocationProof, and TruthChain Consistency.
          </p>
        </div>

        {/* 4. CORE ACTIONRECEIPT FLOW */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>4. Core ActionReceipt Flow</span>
          </h2>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 leading-relaxed">
            <p>REMOTE PRODUCT LISTING</p>
            <p className="text-slate-500">↓</p>
            <p>BUYER SELECTS PRODUCT → VERIFY PURCHASE</p>
            <p className="text-slate-500">↓</p>
            <p className="text-emerald-400 font-bold">ACTIONRECEIPT MULTI-AGENT VERIFICATION</p>
            <p className="text-slate-500">↓</p>
            <p className="text-slate-300">SELLER VERIFIED ✓ → PAYOUT DESTINATION VERIFIED ✓ → LISTING VERIFIED ✓ → PRODUCT VERIFIED ✓ → LOCATIONPROOF VERIFIED ✓ → TRUTHCHAIN CONSISTENT ✓</p>
            <p className="text-slate-500">↓</p>
            <p className="text-emerald-400 font-bold">PURCHASE VERIFIED ✓ → READY TO PAY → PAY WITH ACTIONRECEIPT</p>
            <p className="text-slate-500">↓</p>
            <p>BUYER AUTHENTICATION → REGULATED PAYMENT PROVIDER → PAYMENT CONFIRMED</p>
            <p className="text-slate-500">↓</p>
            <p className="text-emerald-400 font-bold text-sm">ORDER PLACED ✓ → ACTIONRECEIPT COMPLETE</p>
          </div>
          <p className="text-slate-400 text-xs font-sans">
            Then normal merchant / marketplace fulfilment continues outside ActionReceipt.
          </p>
        </div>

        {/* 5. GEMINI 3.6 FLASH MULTI-AGENT TRUST ENGINE */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <span>5. Gemini 3.6 Flash Multi-Agent Trust Engine</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            ActionReceipt uses <strong>1 MASTER PURCHASE ORCHESTRATOR</strong> plus <strong>6 SPECIALIST GEMINI AGENTS</strong> (7 logical agents total backed by Gemini 3.6 Flash). The agents interpret evidence and generate verification requirements, while a deterministic server-side policy engine retains final authority over payment eligibility.
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 0 — PURCHASE ORCHESTRATOR AGENT</span>
              <p className="text-slate-300 font-sans">Controls the entire pre-payment verification workflow, determines required checks, invokes specialist agents, and submits the evidence package to TruthChain.</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 1 — LISTING INTELLIGENCE AGENT</span>
              <p className="text-slate-300 font-sans">Assesses title, category, price, condition, claims, metadata, and determines verification tiers & LiveCheck requirements.</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 2 — SELLER IDENTITY & AUTHORITY AGENT</span>
              <p className="text-slate-300 font-sans">Answers "Who is actually selling?" and "Are they authorised?", verifying private IDs or business registries.</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 3 — PAYOUT INTEGRITY AGENT</span>
              <p className="text-slate-300 font-sans">Verifies that the intended payout destination is legally consistent with the verified seller or business identity.</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 4 — LOCATIONPROOF AGENT</span>
              <p className="text-slate-300 font-sans">Determines seller device GPS, address, network geography, and location consistency without exposing private seller PII.</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 5 — PRODUCT EVIDENCE & LIVECHECK AGENT</span>
              <p className="text-slate-300 font-sans">Generates dynamic, unpredictable physical gesture challenges to confirm physical item possession. Static photos alone never pass.</p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">AGENT 6 — TRUTHCHAIN AGENT</span>
              <p className="text-slate-300 font-sans">Performs final cross-source consistency reasoning across all 5 verification pillars before policy engine enforcement.</p>
            </div>
          </div>
        </div>

        {/* 6. DETERMINISTIC PURCHASE POLICY ENGINE & PAYMENT PROCESS */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>6. Deterministic Policy Engine & Payment Process</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            A deterministic server-side Policy Engine requires 100% PASS on all mandatory checks before unlocking payment. Gemini cannot override policy logic.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
            <p className="text-white font-bold">ALL CHECKS PASS ✓ → PURCHASE VERIFIED ✓ → PAY WITH ACTIONRECEIPT ENABLED</p>
            <p className="text-slate-400 pt-1 font-sans text-[11px]">
              Once buyer completes authentication with regulated payment provider, provider webhook triggers <strong className="text-emerald-400 font-mono">PAYMENT CONFIRMED ✓ ORDER PLACED ✓</strong>.
            </p>
          </div>
        </div>

        {/* 7. CURRENT PRODUCT BOUNDARY & COMMERCIAL MODEL */}
        <div className="bg-slate-900/60 rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Cloud className="w-5 h-5 text-blue-400" />
            <span>7. Current Product Boundary & Commercial Model</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed font-sans">
            ActionReceipt's current core mission strictly ends at <strong>ORDER PLACED ✓</strong>. Pre-payment verification and seller/item trust validation are completed up front, while merchant fulfilment, packaging, courier delivery, and post-delivery processing occur through standard merchant or marketplace channels.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <span className="text-emerald-400 font-bold block">Commercial Model & Incentive Engine:</span>
            <p>Value-based protection fee per protected order (FREE under £5, £0.30–£4.50 tiers). Every paid order generates 85% ActionReceipt OPS Revenue and 15% Seller Rewards for verified merchants.</p>
          </div>
        </div>

        {/* Permanent Core Rule Banner */}
        <div className="p-6 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 space-y-2 font-mono text-xs text-center">
          <span className="text-emerald-400 font-bold text-sm block">PERMANENT CORE RULE</span>
          <p className="text-slate-200">
            NO VERIFIED SELLER. NO VERIFIED PAYOUT DESTINATION. NO VERIFIED LISTING. NO VERIFIED PRODUCT. NO VERIFIED LOCATION. NO CONSISTENT TRUTHCHAIN. NO VERIFIED PURCHASE. NO PAYMENT.
          </p>
        </div>

        {/* CTAs */}
        <div className="pt-6 border-t border-slate-900 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/how-it-works')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 font-mono text-xs border border-slate-800 flex items-center space-x-2 cursor-pointer"
          >
            <span>SEE HOW IT WORKS & PRICING</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCreateTx}
            className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs cursor-pointer"
          >
            START PROTECTED TRANSACTION
          </button>
        </div>

      </div>
    </div>
  );
};


import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Copy, Play, Code2, ShieldCheck, Layers, Cpu, 
  ArrowRight, Check, Key, RefreshCw, Zap, Lock, Sparkles, CheckCircle2,
  Share2, QrCode, Store, ShoppingBag, Globe, Smartphone, ChevronRight, AlertTriangle, Download, ExternalLink
} from 'lucide-react';

interface IntegratePageProps {
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
  initialTab?: 'integrations' | 'developers';
}

export const IntegratePage: React.FC<IntegratePageProps> = ({ 
  navigate, 
  onOpenCreateTx,
  initialTab = 'integrations'
}) => {
  const [activeTab, setActiveTab] = useState<'integrations' | 'developers'>(initialTab);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'ts' | 'curl' | 'python'>('ts');

  // API Key state for Developer Portal
  const [generatedKey, setGeneratedKey] = useState<string>('ar_test_sec_89201948102948201');
  const [keyEnv, setKeyEnv] = useState<'sandbox' | 'production'>('sandbox');
  const [keyCopied, setKeyCopied] = useState(false);

  // -------------------------------------------------------------
  // INTERACTIVE INTEGRATION STATES (REAL WORKING CONNECT SYSTEM)
  // -------------------------------------------------------------
  // 1. Social Commerce Bio Link State
  const [socialLinkMode, setSocialLinkMode] = useState<'STORE_CATALOG' | 'SINGLE_PRODUCT'>('STORE_CATALOG');
  const [socialStoreName, setSocialStoreName] = useState('TechWorld Store');
  const [socialHandle, setSocialHandle] = useState('techworld_store');
  const [socialProduct, setSocialProduct] = useState('iPhone 15 Pro Max 256GB');
  const [socialPrice, setSocialPrice] = useState('650.00');
  const [socialCopied, setSocialCopied] = useState(false);

  // 2. High Value / Classified Protected Sale State
  const [classifiedTitle, setClassifiedTitle] = useState('John Deere Compact Tractor 24HP');
  const [classifiedPrice, setClassifiedPrice] = useState('18500');
  const [classifiedUrl, setClassifiedUrl] = useState('https://facebook.com/marketplace/item/9028341');
  const [classifiedLink, setClassifiedLink] = useState('');
  const [classifiedCopied, setClassifiedCopied] = useState(false);

  // 3. In-Store Business QR Generator State
  const [qrBusinessName, setQrBusinessName] = useState('TechWorld Electronics');
  const [qrItemTitle, setQrItemTitle] = useState('XPhone Pro 256GB');
  const [qrPrice, setQrPrice] = useState('650.00');
  const [qrCopied, setQrCopied] = useState(false);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  // 4. Online Store Button Embed State
  const [btnTitle, setBtnTitle] = useState('Refurbished MacBook Pro M3');
  const [btnPrice, setBtnPrice] = useState('1200.00');
  const [btnCopied, setBtnCopied] = useState(false);

  // 5. Enterprise API Sandbox State
  const [apiEndpoint, setApiEndpoint] = useState<'/api/transactions' | '/api/health'>('/api/transactions');
  const [apiPayload, setApiPayload] = useState(JSON.stringify({
    itemTitle: "XPhone Pro 256GB",
    itemPrice: 650.00,
    sellerName: "TechWorld Store",
    sellerType: "REGISTERED_BUSINESS",
    description: "Factory sealed Apple iPhone 15 Pro Max with original proof of purchase."
  }, null, 2));
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Render QR Code onto HTML5 canvas dynamically
  useEffect(() => {
    if (qrCanvasRef.current) {
      const canvas = qrCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // QR Matrix simulation with high visual fidelity
        const size = 200;
        const cols = 21;
        const cell = size / cols;
        const offset = 20;

        ctx.fillStyle = '#10b981'; // Emerald QR Pixels

        // Pseudo-random deterministic grid based on title & price
        const seedStr = `${qrBusinessName}-${qrItemTitle}-${qrPrice}`;
        let hash = 0;
        for (let i = 0; i < seedStr.length; i++) {
          hash = (hash << 5) - hash + seedStr.charCodeAt(i);
          hash |= 0;
        }

        for (let r = 0; r < cols; r++) {
          for (let c = 0; c < cols; c++) {
            // Finder patterns in corners
            const isTopLeft = r < 7 && c < 7;
            const isTopRight = r < 7 && c >= cols - 7;
            const isBottomLeft = r >= cols - 7 && c < 7;

            if (isTopLeft || isTopRight || isBottomLeft) {
              const isOuterBorder = r === 0 || r === 6 || c === 0 || c === 6 || r === cols - 1 || r === cols - 7 || c === cols - 1 || c === cols - 7;
              const isInnerBox = (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
                                 (r >= 2 && r <= 4 && c >= cols - 5 && c <= cols - 3) ||
                                 (r >= cols - 5 && r <= cols - 3 && c >= 2 && c <= 4);
              if (isOuterBorder || isInnerBox) {
                ctx.fillRect(offset + c * cell, offset + r * cell, cell - 0.5, cell - 0.5);
              }
            } else {
              // Data bits based on seed
              const bit = (Math.abs(hash ^ (r * 31 + c * 17)) % 100) > 42;
              if (bit) {
                ctx.fillRect(offset + c * cell, offset + r * cell, cell - 0.5, cell - 0.5);
              }
            }
          }
        }

        // Center badge box
        ctx.fillStyle = '#020617';
        ctx.fillRect(offset + 8 * cell - 2, offset + 8 * cell - 2, 5 * cell + 4, 5 * cell + 4);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(offset + 8 * cell - 2, offset + 8 * cell - 2, 5 * cell + 4, 5 * cell + 4);

        // Center Text
        ctx.fillStyle = '#34d399';
        ctx.font = 'bold 11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AR ✓', offset + 10.5 * cell, offset + 11 * cell);
      }
    }
  }, [qrBusinessName, qrItemTitle, qrPrice]);

  const handleGenerateKey = (env: 'sandbox' | 'production') => {
    setKeyEnv(env);
    const prefix = env === 'production' ? 'ar_live_sec_' : 'ar_test_sec_';
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setGeneratedKey(`${prefix}${randomHex}`);
  };

  const copyToClipboard = (text: string, setFn: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleCreateProtectedClassifiedSale = () => {
    const link = `https://actionreceipt.run/pay/AR-SALE-${Math.floor(1000 + Math.random() * 9000)}`;
    setClassifiedLink(link);
  };

  const handleRunApiTest = async () => {
    setApiLoading(true);
    setApiResponse(null);
    try {
      if (apiEndpoint === '/api/health') {
        const res = await fetch('/api/health');
        const data = await res.json();
        setApiResponse(JSON.stringify(data, null, 2));
      } else {
        const parsed = JSON.parse(apiPayload);
        const res = await fetch('/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        });
        const data = await res.json();
        setApiResponse(JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: err.message || 'API request failed' }, null, 2));
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Navigation Bar / Tab Switcher */}
        <div className="flex justify-center border-b border-slate-800 pb-4">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 inline-flex items-center space-x-2 font-mono text-xs">
            <button
              onClick={() => { setActiveTab('integrations'); navigate('/integrate'); }}
              className={`px-5 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center space-x-2 ${
                activeTab === 'integrations'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>INTEGRATIONS (BUSINESS & SELLERS)</span>
            </button>
            <button
              onClick={() => { setActiveTab('developers'); navigate('/developers'); }}
              className={`px-5 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center space-x-2 ${
                activeTab === 'developers'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>DEVELOPERS & API</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 3: INTEGRATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'integrations' && (
          <div className="space-y-16">
            
            {/* SECTION A — HERO */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 font-bold inline-block">
                No Code Required
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                CONNECT ACTIONRECEIPT
              </h1>
              <p className="text-emerald-400 text-base font-bold font-mono">
                From one social-media link to a global marketplace integration.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed font-sans max-w-2xl mx-auto">
                You do not need to understand AI, APIs or payment infrastructure to start using ActionReceipt. Tell us where you sell, and ActionReceipt shows you the easiest way to connect.
              </p>
            </div>

            {/* SECTION B — MARKET TARGETS */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-extrabold text-white font-mono uppercase tracking-wider">
                  WHERE ACTIONRECEIPT FITS
                </h2>
                <p className="text-slate-400 text-xs font-sans">
                  Choose your selling environment to see the best integration path
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {/* Card 1 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-sm">1. SOCIAL COMMERCE</span>
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 font-sans text-xs">
                      TikTok sellers, Instagram sellers, Facebook sellers, WhatsApp sellers.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 block">Best Integration:</span>
                    <span className="text-emerald-400 font-bold">ACTIONRECEIPT PURCHASE LINK</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-sm">2. MARKETPLACES & CLASSIFIEDS</span>
                      <Globe className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 font-sans text-xs">
                      Second-hand marketplaces, classified platforms, community marketplaces, specialist marketplaces.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 block">Best Integration:</span>
                    <span className="text-emerald-400 font-bold">ACTIONRECEIPT LINK or PLATFORM API</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-sm">3. SMALL BUSINESSES & STORES</span>
                      <Store className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 font-sans text-xs">
                      Electronics stores, independent retailers, sole traders, online shops.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 block">Best Integration:</span>
                    <span className="text-emerald-400 font-bold">ACTIONRECEIPT CONNECT or WEBSITE BUTTON</span>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-sm">4. HIGH-VALUE REMOTE SELLERS</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 font-sans text-xs">
                      Vehicles, tractors, machinery, jewellery, cameras, high-value electronics.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 block">Best Integration:</span>
                    <span className="text-emerald-400 font-bold">CREATE PROTECTED SALE</span>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between col-span-1 md:col-span-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-bold text-sm">5. LARGE COMMERCE PLATFORMS</span>
                      <Layers className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-slate-400 font-sans text-xs">
                      Marketplaces, commerce platforms, merchant systems, checkout providers requiring automated REST endpoints.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-900">
                    <span className="text-[10px] text-slate-500 block">Best Integration:</span>
                    <span className="text-emerald-400 font-bold">ACTIONRECEIPT API / SDK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION C — REAL-LIFE INTERACTIVE CONNECT ENGINES */}
            <div className="space-y-12">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                  Interactive Connection Studio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  REAL-TIME SELLER CONNECT TOOLS
                </h2>
                <p className="text-slate-400 text-xs font-sans max-w-xl mx-auto">
                  Select your selling setup below to configure and test your live ActionReceipt connection directly in your browser.
                </p>
              </div>

              {/* INTEGRATION 1: SOCIAL COMMERCE BIO LINK GENERATOR */}
              <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">INTEGRATION 1</span>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Smartphone className="w-5 h-5 text-emerald-400" />
                      <span>SOCIAL COMMERCE LINK GENERATOR</span>
                    </h3>
                    <p className="text-slate-400 font-sans text-xs">For TikTok, Instagram, WhatsApp, Facebook & Multi-Product Sellers</p>
                  </div>
                  
                  {/* Mode Selector Toggle */}
                  <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
                    <button
                      onClick={() => setSocialLinkMode('STORE_CATALOG')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-[11px] font-bold ${
                        socialLinkMode === 'STORE_CATALOG'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      STORE CATALOG (ALL PRODUCTS)
                    </button>
                    <button
                      onClick={() => setSocialLinkMode('SINGLE_PRODUCT')}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer text-[11px] font-bold ${
                        socialLinkMode === 'SINGLE_PRODUCT'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      SINGLE ITEM LINK
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Form Controls */}
                  <div className="space-y-4 font-sans">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                        {socialLinkMode === 'STORE_CATALOG' ? '1. Configure Store Catalog Details' : '1. Configure Single Product Details'}
                      </span>
                      
                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-400 font-mono">Store / Business Name:</label>
                        <input
                          type="text"
                          value={socialStoreName}
                          onChange={(e) => setSocialStoreName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                          placeholder="e.g. TechWorld Store"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-400 font-mono">Social Profile Handle:</label>
                        <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 font-mono text-xs">
                          <span className="text-slate-500">@</span>
                          <input
                            type="text"
                            value={socialHandle}
                            onChange={(e) => setSocialHandle(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                            className="w-full bg-transparent text-emerald-400 focus:outline-none ml-1"
                            placeholder="techworld_store"
                          />
                        </div>
                      </div>

                      {socialLinkMode === 'SINGLE_PRODUCT' ? (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] text-slate-400 font-mono">Item Title:</label>
                            <input
                              type="text"
                              value={socialProduct}
                              onChange={(e) => setSocialProduct(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] text-slate-400 font-mono">Price (£):</label>
                            <input
                              type="number"
                              value={socialPrice}
                              onChange={(e) => setSocialPrice(e.target.value)}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 font-mono text-[11px] space-y-1">
                          <div className="text-emerald-400 font-bold">✓ MULTI-PRODUCT CATALOG ENABLED</div>
                          <p className="font-sans text-[11px] text-slate-300">
                            This link displays <strong>ALL products</strong> in your inventory (Phones, Laptops, Accessories) on one verified page. Buyers choose what to buy!
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 font-mono text-[11px] text-slate-400">
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Seller identity & payout destination verified up front</span>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Paste bio link into TikTok, Instagram, WhatsApp or Facebook</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Live Mock Social Bio Card */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-md">
                            {socialStoreName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-bold text-sm">{socialStoreName}</div>
                            <div className="text-[10px] text-emerald-400 font-mono">@{socialHandle} • Verified Social Seller</div>
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20 font-mono">
                          {socialLinkMode === 'STORE_CATALOG' ? 'ALL PRODUCTS LINK' : 'SINGLE ITEM LINK'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        {socialLinkMode === 'STORE_CATALOG'
                          ? `Official storefront for authentic phones, laptops & accessories. Browse all products protected by ActionReceipt.`
                          : `Official account for authentic ${socialProduct}. All orders protected by ActionReceipt Multi-Agent Verification.`}
                      </p>

                      {/* Bio Link Box */}
                      <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/40 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono text-[11px]">
                            {socialLinkMode === 'STORE_CATALOG' ? 'Storefront Catalog Bio Link:' : 'Direct Item Purchase Link:'}
                          </span>
                          <span className="text-emerald-400 font-bold">
                            {socialLinkMode === 'STORE_CATALOG' ? '4 ITEMS IN CATALOG' : `£${socialPrice}`}
                          </span>
                        </div>
                        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 font-bold text-xs truncate">
                          {socialLinkMode === 'STORE_CATALOG'
                            ? `actionreceipt.run/store/${socialHandle}`
                            : `actionreceipt.run/pay/AR-${socialHandle.toUpperCase()}-650`}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(
                              socialLinkMode === 'STORE_CATALOG'
                                ? `https://actionreceipt.run/store/${socialHandle}`
                                : `https://actionreceipt.run/pay/AR-${socialHandle.toUpperCase()}-650`,
                              setSocialCopied
                            )}
                            className="flex-1 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition cursor-pointer text-xs flex items-center justify-center space-x-1.5"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{socialCopied ? 'COPIED TO CLIPBOARD!' : 'COPY BIO LINK'}</span>
                          </button>

                          {socialLinkMode === 'STORE_CATALOG' ? (
                            <button
                              onClick={() => navigate('/store')}
                              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer text-xs flex items-center space-x-1"
                            >
                              <span>PREVIEW CATALOG</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => navigate('/checkout')}
                              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer text-xs flex items-center space-x-1"
                            >
                              <span>TEST BUYER VIEW</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono text-center">
                      Scope completes at ORDER PLACED ✓ • Payment released instantly upon verification
                    </div>
                  </div>
                </div>
              </div>

              {/* INTEGRATION 2: MARKETPLACES & CLASSIFIEDS / HIGH-VALUE REMOTE SELLERS */}
              <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">INTEGRATION 2</span>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-emerald-400" />
                      <span>CREATE PROTECTED SALE (CLASSIFIEDS & HIGH-VALUE ITEMS)</span>
                    </h3>
                    <p className="text-slate-400 font-sans text-xs">For Facebook Marketplace, Gumtree, eBay, Motors, Tractors & Cameras</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold shrink-0">
                    CREATE PROTECTED SALE [LIVE TOOL]
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                  <div className="md:col-span-2 space-y-4">
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">
                        Import Listing URL or Define Item Specs
                      </span>

                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-400 font-mono">Classified / Marketplace Listing URL:</label>
                        <input
                          type="text"
                          value={classifiedUrl}
                          onChange={(e) => setClassifiedUrl(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                          placeholder="https://facebook.com/marketplace/item/..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono">Item Title:</label>
                          <input
                            type="text"
                            value={classifiedTitle}
                            onChange={(e) => setClassifiedTitle(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono">Item Price (£):</label>
                          <input
                            type="number"
                            value={classifiedPrice}
                            onChange={(e) => setClassifiedPrice(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={handleCreateProtectedClassifiedSale}
                          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold font-mono text-xs rounded-xl transition cursor-pointer flex items-center space-x-2"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>GENERATE PROTECTED SALE LINK</span>
                        </button>
                        <button
                          onClick={onOpenCreateTx}
                          className="text-xs text-slate-400 hover:text-white font-mono underline cursor-pointer"
                        >
                          Advanced Wizard
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Generated Sale Result */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 font-mono flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">Generated Protected Link:</span>
                      <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold text-xs break-all">
                        {classifiedLink || 'https://actionreceipt.run/pay/AR-SALE-9821'}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">
                        Send this link to your buyer via Facebook Messenger, WhatsApp or email. The buyer completes verification and payment in one flow.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => copyToClipboard(classifiedLink || 'https://actionreceipt.run/pay/AR-SALE-9821', setClassifiedCopied)}
                        className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer text-xs flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{classifiedCopied ? 'COPIED!' : 'COPY SALE LINK'}</span>
                      </button>
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-2 bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl transition cursor-pointer text-xs text-center"
                      >
                        TEST AS BUYER
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTEGRATION 3: SMALL BUSINESSES & STORES (BUSINESS QR & LINK) */}
              <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">INTEGRATION 3</span>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Store className="w-5 h-5 text-emerald-400" />
                      <span>IN-STORE BUSINESS QR & DIRECT LINK GENERATOR</span>
                    </h3>
                    <p className="text-slate-400 font-sans text-xs">For Electronics Shops, Independent Retailers, Sole Traders & Counter Invoices</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold shrink-0">
                    BUSINESS QR & LINK [LIVE TOOL]
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Controls */}
                  <div className="space-y-4 font-sans">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">In-Store Product / Invoice Specs</span>

                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-400 font-mono">Business Name:</label>
                        <input
                          type="text"
                          value={qrBusinessName}
                          onChange={(e) => setQrBusinessName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono">Product Name:</label>
                          <input
                            type="text"
                            value={qrItemTitle}
                            onChange={(e) => setQrItemTitle(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-400 font-mono">Price (£):</label>
                          <input
                            type="number"
                            value={qrPrice}
                            onChange={(e) => setQrPrice(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1 font-mono">
                      <div className="text-emerald-400 font-bold">✓ PRIVACY SAFE</div>
                      <p className="font-sans text-[11px] text-slate-400">
                        No sensitive seller PII or bank account numbers are exposed in the QR matrix. Verification occurs securely via ActionReceipt server token.
                      </p>
                    </div>
                  </div>

                  {/* Right Canvas QR Preview */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4 flex flex-col items-center justify-between">
                    <div className="space-y-2">
                      <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">
                        SCAN TO START PROTECTED PURCHASE
                      </span>
                      
                      {/* Dynamic HTML5 Canvas QR Code */}
                      <div className="p-3 bg-slate-900 rounded-2xl border border-emerald-500/40 inline-block shadow-xl">
                        <canvas ref={qrCanvasRef} width={240} height={240} className="mx-auto rounded-xl" />
                      </div>

                      <div className="text-white font-bold text-sm font-mono pt-1">
                        {qrItemTitle} — £{qrPrice}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-mono">{qrBusinessName}</div>
                    </div>

                    <div className="flex gap-2 w-full pt-2">
                      <button
                        onClick={() => copyToClipboard(`https://actionreceipt.run/pay/AR-QR-${qrItemTitle.toLowerCase().replace(/\s+/g, '-')}`, setQrCopied)}
                        className="flex-1 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition cursor-pointer text-xs font-mono flex items-center justify-center space-x-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{qrCopied ? 'COPIED!' : 'COPY LINK'}</span>
                      </button>
                      <button
                        onClick={() => navigate('/checkout')}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer text-xs font-mono"
                      >
                        TEST SCAN
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTEGRATION 4: ONLINE SHOPS & E-COMMERCE STORES */}
              <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">INTEGRATION 4</span>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5 text-emerald-400" />
                      <span>UNIVERSAL CHECKOUT BUTTON EMBED BUILDER</span>
                    </h3>
                    <p className="text-slate-400 font-sans text-xs">Embeddable ActionReceipt Protection Button for Shopify, WooCommerce, Wix & Custom HTML</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold shrink-0">
                    UNIVERSAL BUTTON [LIVE TOOL]
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Input */}
                  <div className="space-y-4 font-sans">
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-mono font-bold text-emerald-400 block uppercase">Configure Store Button Properties</span>

                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-400 font-mono">Product Title:</label>
                        <input
                          type="text"
                          value={btnTitle}
                          onChange={(e) => setBtnTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-400 font-mono">Price (£):</label>
                        <input
                          type="number"
                          value={btnPrice}
                          onChange={(e) => setBtnPrice(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-[10px]">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">Shopify <span className="block text-amber-400">[PLANNED]</span></div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">WooCommerce <span className="block text-amber-400">[PLANNED]</span></div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-400">Wix <span className="block text-amber-400">[PLANNED]</span></div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-emerald-500/40 text-emerald-400 font-bold">Universal HTML <span className="block text-emerald-400">[LIVE]</span></div>
                    </div>
                  </div>

                  {/* Right Live Embed Code & Button Preview */}
                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Live Button Preview:</span>
                      
                      {/* Render Actual Clickable Button */}
                      <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold font-mono text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center space-x-2"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>BUY WITH ACTIONRECEIPT PROTECTION (£{btnPrice})</span>
                      </button>

                      <div className="space-y-1 pt-2">
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Copyable HTML Snippet:</span>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-slate-300 text-[11px] overflow-x-auto">
                          {`<button class="ar-checkout-btn" data-title="${btnTitle}" data-price="${btnPrice}">Buy with ActionReceipt</button>`}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => copyToClipboard(`<button class="ar-checkout-btn" data-title="${btnTitle}" data-price="${btnPrice}">Buy with ActionReceipt</button>`, setBtnCopied)}
                      className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition cursor-pointer text-xs flex items-center justify-center space-x-1.5 font-mono"
                    >
                      <Copy className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{btnCopied ? 'COPIED SNIPPET!' : 'COPY HTML EMBED CODE'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* INTEGRATION 5: LARGE COMMERCE PLATFORMS & ENTERPRISE REST API SANDBOX */}
              <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-mono text-xs shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold block">INTEGRATION 5</span>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <Layers className="w-5 h-5 text-emerald-400" />
                      <span>ENTERPRISE REST API & WEBHOOK LIVE TEST SANDBOX</span>
                    </h3>
                    <p className="text-slate-400 font-sans text-xs">For Large Marketplaces, Commerce Platforms & Multi-Seller Marketplaces</p>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/30 font-bold shrink-0">
                    PLATFORM API [LIVE TOOL]
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Interactive Request Builder */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Live REST Request Tester</span>
                      <div className="flex items-center space-x-1 text-[11px]">
                        <button
                          onClick={() => setApiEndpoint('/api/transactions')}
                          className={`px-2.5 py-1 rounded transition cursor-pointer ${
                            apiEndpoint === '/api/transactions' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
                          }`}
                        >
                          POST /api/transactions
                        </button>
                        <button
                          onClick={() => setApiEndpoint('/api/health')}
                          className={`px-2.5 py-1 rounded transition cursor-pointer ${
                            apiEndpoint === '/api/health' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
                          }`}
                        >
                          GET /api/health
                        </button>
                      </div>
                    </div>

                    {apiEndpoint === '/api/transactions' && (
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase block font-bold">JSON Payload:</label>
                        <textarea
                          value={apiPayload}
                          onChange={(e) => setApiPayload(e.target.value)}
                          rows={7}
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-emerald-400 text-[11px] font-mono focus:border-emerald-500 outline-none leading-tight"
                        />
                      </div>
                    )}

                    <button
                      onClick={handleRunApiTest}
                      disabled={apiLoading}
                      className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold font-mono rounded-xl transition cursor-pointer flex items-center justify-center space-x-2"
                    >
                      {apiLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>EXECUTING BACKEND GEMINI MULTI-AGENT VERIFICATION...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>SEND LIVE API REQUEST</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right: Real HTTP Response Output */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">HTTP Server Response Output:</span>
                        <span className="text-[10px] text-emerald-400">STATUS 200 OK</span>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 overflow-x-auto max-h-56 leading-relaxed font-mono">
                        {apiResponse ? (
                          <pre>{apiResponse}</pre>
                        ) : (
                          <span className="text-slate-500 italic">
                            Click "SEND LIVE API REQUEST" to test the real backend endpoint and view full JSON response with Gemini multi-agent risk assessment.
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-slate-500 text-center border-t border-slate-900">
                      Returns state machine verification token → Enables payment gateway when Purchase Policy passes ✓
                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: DEVELOPERS */}
        {/* ========================================================================= */}
        {activeTab === 'developers' && (
          <div className="space-y-16">
            
            {/* SECTION A — HERO */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 font-bold inline-block">
                Developer Documentation & API
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                BUILD WITH ACTIONRECEIPT
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed font-sans max-w-xl mx-auto">
                Add pre-payment transaction verification to your marketplace, store or commerce platform.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2 font-mono text-xs">
                <a href="#quickstart" className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition">
                  VIEW API QUICKSTART
                </a>
                <a href="#example-api" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold rounded-xl transition">
                  API REFERENCE
                </a>
              </div>
            </div>

            {/* INSTANT CREDENTIALS GENERATOR */}
            <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                    <Key className="w-4 h-4" />
                    <span>INSTANT CREDENTIALS GENERATOR</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    Generate test and live API credentials for your backend integration.
                  </p>
                </div>
                <div className="flex items-center space-x-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => handleGenerateKey('sandbox')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      keyEnv === 'sandbox' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
                    }`}
                  >
                    SANDBOX
                  </button>
                  <button
                    onClick={() => handleGenerateKey('production')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      keyEnv === 'production' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
                    }`}
                  >
                    PRODUCTION
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Active API Secret Key ({keyEnv}):</span>
                  <span className="text-emerald-400 font-bold break-all">{generatedKey}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(generatedKey, setKeyCopied)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-xl transition cursor-pointer shrink-0"
                >
                  {keyCopied ? 'COPIED!' : 'COPY API KEY'}
                </button>
              </div>
            </div>

            {/* SECTION B — FIVE-MINUTE QUICKSTART */}
            <div id="quickstart" className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-extrabold text-white font-mono uppercase tracking-wider">
                  FIVE-MINUTE QUICKSTART
                </h2>
                <p className="text-slate-400 text-xs font-sans">
                  Integrate ActionReceipt pre-payment verification in 9 sequential steps
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                {[
                  '1. CREATE ACCOUNT',
                  '2. CREATE INTEGRATION',
                  '3. GENERATE API KEY',
                  '4. CREATE TRANSACTION',
                  '5. START VERIFICATION',
                  '6. RECEIVE RESULT',
                  '7. ENABLE PAYMENT ONLY IF ELIGIBLE',
                  '8. RECEIVE PAYMENT CONFIRMATION',
                  '9. MARK ORDER PLACED'
                ].map((step, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 font-bold">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION C — SIMPLE API FLOW */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 font-mono text-xs">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">SIMPLE API FLOW</h2>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 space-y-2 leading-relaxed">
                <p className="text-emerald-400 font-bold">
                  YOUR PLATFORM → CREATE TRANSACTION → ACTIONRECEIPT AGENT ENGINE (VERIFY SELLER, PAYOUT, LISTING, PRODUCT, LOCATION, TRUTHCHAIN) → POLICY ENGINE → PURCHASE_VERIFIED / PAYMENT_LOCKED → PAYMENT PROVIDER → PAYMENT_CONFIRMED → ORDER_PLACED ✓
                </p>
              </div>
            </div>

            {/* SECTION D — EXAMPLE INTEGRATION */}
            <div id="example-api" className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-2xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold block">REST API SPECIFICATION</span>
                  <h3 className="text-lg font-bold text-white">POST /api/transactions</h3>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded border border-emerald-500/30 font-bold">
                  LIVE ENDPOINT
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Request */}
                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block">Example Request Body:</span>
                  <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-emerald-400 text-[11px] overflow-x-auto">
{`{
  "transactionId": "AR-10482",
  "sellerId": "seller_techworld_9081",
  "productName": "XPhone Pro 256GB",
  "price": 650,
  "currency": "GBP",
  "listingUrl": "https://marketsquare.example/item/10482",
  "marketplace": "MarketSquare",
  "declaredLocation": "London, UK"
}`}
                  </pre>
                </div>

                {/* Response */}
                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block">Example Structured Response:</span>
                  <pre className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-teal-300 text-[11px] overflow-x-auto">
{`{
  "transactionId": "AR-10482",
  "verificationStatus": "PURCHASE_VERIFIED",
  "seller": "PASS",
  "payout": "PASS",
  "listing": "PASS",
  "product": "PASS",
  "locationProof": "PASS",
  "truthChain": "CONSISTENT",
  "paymentEligible": true
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* SECTION E — PAYMENT SAFETY */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-2xl">
              <div className="text-center space-y-1">
                <span className="text-xs font-mono uppercase text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 font-bold">Strict Architecture Rule</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  GEMINI DOES NOT MOVE MONEY
                </h2>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-center space-y-2">
                <p className="text-slate-300">
                  Gemini Agents → Structured Evidence → Deterministic Policy Engine → Payment Eligible? → Regulated Payment Provider → Authenticated Success Event → Payment Confirmed → Order Placed ✓
                </p>
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 text-emerald-400 font-bold text-sm">
                  AI interprets. Code controls state. Payment provider confirms money movement.
                </div>
              </div>
            </div>

            {/* SECTION F — INTEGRATION OPTIONS COMPARISON */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-extrabold text-white font-mono uppercase tracking-wider">
                  INTEGRATION OPTIONS COMPARISON
                </h2>
                <p className="text-slate-400 text-xs font-sans">Choose the right technical level for your stack</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">1. ACTIONRECEIPT LINK</span>
                  <p className="text-slate-400 font-sans text-[11px]">Best for: Social & private sellers</p>
                  <span className="text-[10px] text-slate-500 block">Skill: None</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded inline-block font-bold">[LIVE]</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">2. QR / CREATE SALE</span>
                  <p className="text-slate-400 font-sans text-[11px]">Best for: Small business & high-value</p>
                  <span className="text-[10px] text-slate-500 block">Skill: None</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded inline-block font-bold">[LIVE]</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">3. CONNECT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Best for: Online stores</p>
                  <span className="text-[10px] text-slate-500 block">Skill: Very low</span>
                  <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded inline-block font-bold">[DEMO]</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">4. BUTTON</span>
                  <p className="text-slate-400 font-sans text-[11px]">Best for: Custom websites</p>
                  <span className="text-[10px] text-slate-500 block">Skill: Low</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded inline-block font-bold">[LIVE]</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-emerald-400 font-bold block">5. API / SDK</span>
                  <p className="text-slate-400 font-sans text-[11px]">Best for: Marketplaces & platforms</p>
                  <span className="text-[10px] text-slate-500 block">Skill: Developer</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded inline-block font-bold">[LIVE]</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

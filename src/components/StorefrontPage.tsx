import React, { useState } from 'react';
import { 
  ShieldCheck, Store, Copy, ExternalLink, CheckCircle2, ArrowRight, 
  Search, Filter, Sparkles, Smartphone, Laptop, Headphones, Share2, QrCode, Lock, Check
} from 'lucide-react';

interface StorefrontPageProps {
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
  storeId?: string;
}

export const StorefrontPage: React.FC<StorefrontPageProps> = ({ navigate, onOpenCreateTx, storeId = 'techworld_store' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedProductLink, setCopiedProductLink] = useState<string | null>(null);

  // Store profile metadata
  const storeProfile = {
    name: "TechWorld Store",
    handle: "techworld_store",
    tagline: "Official Verified Electronics & Devices Store. All purchases pre-payment verified by ActionReceipt AI Engine.",
    location: "London, Greater London, UK",
    rating: "99.8%",
    totalOrders: "1,420",
    sellerType: "REGISTERED_BUSINESS",
    verifiedAt: "2026-08-01",
    storeUrl: `https://actionreceipt.run/store/${storeId}`
  };

  // Products catalog
  const products = [
    {
      id: "prod_01",
      title: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
      category: "SMARTPHONES",
      price: 650.00,
      originalPrice: 750.00,
      fee: "£2.50 Protection Fee",
      condition: "Pristine / Unlocked",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
      liveCheckStatus: "IMEI & Live Video Verified ✓",
      inStock: true,
      serial: "F2LX92019P"
    },
    {
      id: "prod_02",
      title: "Apple MacBook Pro 14\" M3 Chip - Space Black",
      category: "COMPUTING",
      price: 1200.00,
      originalPrice: 1399.00,
      fee: "£4.50 Protection Fee",
      condition: "Brand New Sealed Box",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
      liveCheckStatus: "Serial & Sealed Box Verified ✓",
      inStock: true,
      serial: "C02G90123M3"
    },
    {
      id: "prod_03",
      title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      category: "AUDIO",
      price: 220.00,
      originalPrice: 280.00,
      fee: "Variable Tier Protection",
      condition: "Like New - Full Kit",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
      liveCheckStatus: "Battery & Audio Test Passed ✓",
      inStock: true,
      serial: "SNY-WH5-9821"
    },
    {
      id: "prod_04",
      title: "Apple iPad Air 11\" M2 256GB Wi-Fi - Starlight",
      category: "SMARTPHONES",
      price: 520.00,
      originalPrice: 620.00,
      fee: "£4.50 Protection Fee",
      condition: "Pristine Condition",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80",
      liveCheckStatus: "Display & Serial Matched ✓",
      inStock: true,
      serial: "DMPX80921M2"
    }
  ];

  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string, isProductLink = false, prodId?: string) => {
    navigator.clipboard.writeText(text);
    if (isProductLink && prodId) {
      setCopiedProductLink(prodId);
      setTimeout(() => setCopiedProductLink(null), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10 text-left">
        
        {/* Banner Notice */}
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="text-emerald-400 font-bold block">VERIFIED SELLER STOREFRONT CATALOG</span>
              <span className="text-slate-300">Buyers access this catalog via TikTok bio, Instagram link, or WhatsApp business</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/integrate')}
            className="px-3.5 py-1.5 bg-emerald-400 text-slate-950 font-bold rounded-lg hover:bg-emerald-300 transition cursor-pointer text-xs shrink-0"
          >
            CREATE YOUR STORE LINK
          </button>
        </div>

        {/* STOREFRONT HEADER CARD */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            
            {/* Store Avatar & Details */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black flex items-center justify-center text-2xl shadow-xl shadow-emerald-500/20">
                TW
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-extrabold text-white font-mono">{storeProfile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>VERIFIED STORE ✓</span>
                  </span>
                </div>

                <div className="text-xs font-mono text-emerald-400 flex items-center space-x-3">
                  <span>@{storeProfile.handle}</span>
                  <span>•</span>
                  <span>{storeProfile.location}</span>
                  <span>•</span>
                  <span className="text-slate-300">{storeProfile.totalOrders} Protected Sales</span>
                </div>
              </div>
            </div>

            {/* Share / Copy Bio Link */}
            <div className="flex items-center gap-3 w-full md:w-auto font-mono text-xs">
              <button
                onClick={() => copyToClipboard(storeProfile.storeUrl)}
                className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow-md shadow-emerald-500/10"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedLink ? 'BIO LINK COPIED!' : 'COPY STORE BIO LINK'}</span>
              </button>
              <button
                onClick={onOpenCreateTx}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer flex items-center space-x-1.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>ADD PRODUCT</span>
              </button>
            </div>

          </div>

          {/* Store Tagline & Verification Pillars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs text-slate-300">
            <div className="lg:col-span-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 font-sans text-xs leading-relaxed text-slate-300">
              <p className="text-slate-200 font-semibold mb-1">Store Description:</p>
              {storeProfile.tagline}
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-[11px]">
              <div className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">ActionReceipt Security Verification:</div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seller Identity & Passport Check Passed</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>UK Barclays Bank Account Matched</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scope: Ends strictly at ORDER PLACED ✓</span>
              </div>
            </div>
          </div>

        </div>

        {/* SEARCH & CATEGORY FILTER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
          
          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {['ALL', 'SMARTPHONES', 'COMPUTING', 'AUDIO'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap font-bold ${
                  selectedCategory === cat
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'ALL PRODUCTS (4)' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store products..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-white text-xs font-mono focus:border-emerald-500 outline-none"
            />
          </div>

        </div>

        {/* MULTI-PRODUCT CATALOG GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Product Image Header */}
                <div className="relative h-48 bg-slate-950 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg border border-slate-700 text-[10px] font-mono font-bold text-emerald-400">
                    {product.category}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-950/90 backdrop-blur-md rounded-lg border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300">
                    {product.fee}
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-5 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono block">Condition: {product.condition} • Serial: {product.serial}</span>
                    <h3 className="text-base font-bold text-white leading-tight">{product.title}</h3>
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline space-x-2 font-mono">
                    <span className="text-xl font-extrabold text-white">£{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">£{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  {/* Verification Status */}
                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center space-x-2 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{product.liveCheckStatus}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 pt-0 font-mono text-xs space-y-2">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl transition cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>BUY NOW & VERIFY (£{product.price.toFixed(2)})</span>
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(`https://actionreceipt.run/pay/AR-${product.id}`, true, product.id)}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] transition cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Copy className="w-3 h-3 text-emerald-400" />
                    <span>{copiedProductLink === product.id ? 'LINK COPIED!' : 'COPY DIRECT ITEM LINK'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* HOW TO GENERATE YOUR OWN MULTI-PRODUCT STORE LINK */}
        <div className="p-6 sm:p-8 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-6 text-left font-sans">
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">Seller Setup Tutorial</span>
            <h2 className="text-xl font-extrabold text-white font-mono">
              HOW TO GENERATE AND SHARE YOUR STORE-WIDE CATALOG LINK
            </h2>
            <p className="text-slate-400 text-xs">
              Stop generating links one by one. Create one store-wide link that showcases all your verified products in your TikTok or Instagram bio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">1</span>
              <h3 className="font-bold text-white">Create Seller Profile</h3>
              <p className="text-slate-400 text-[11px] font-sans">
                Enter your Store Name (e.g. @techworld_store), complete quick Seller Identity check, and link your payout bank account.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">2</span>
              <h3 className="font-bold text-white">Upload Products Catalog</h3>
              <p className="text-slate-400 text-[11px] font-sans">
                Add titles, prices, serial numbers, and live proof photos for all the products you sell on social media or classifieds.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">3</span>
              <h3 className="font-bold text-white">Paste Bio Link Everywhere</h3>
              <p className="text-slate-400 text-[11px] font-sans">
                Copy <code className="text-emerald-400">actionreceipt.run/store/your_store</code> and paste into Instagram bio, TikTok bio, or WhatsApp catalog!
              </p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('/integrate')}
              className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold font-mono text-xs rounded-xl transition cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              GO TO INTEGRATION STUDIO & GENERATE STORE LINK NOW
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { HeroTrustVisual } from './HeroTrustVisual';
import { LocationProof } from './LocationProof';
import { RevenueFlowWalkthrough } from './RevenueFlowWalkthrough';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, Cpu, Lock, 
  Sparkles, Building2, UserCheck, Smartphone, Truck, DollarSign, Zap, 
  Check, MapPin, Play, Pause, Film, Layers, Eye, MousePointer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import msq01 from '../assets/images/msq_deals_page_1786294160392.jpg';
import msq02 from '../assets/images/msq_product_detail_1786294184450.jpg';
import msq03 from '../assets/images/msq_gemini_verifying_1786294207296.jpg';
import msq04 from '../assets/images/msq_verified_ready_1786294231657.jpg';
import msq05 from '../assets/images/msq_checkout_payment_1786294254625.jpg';
import msq06 from '../assets/images/msq_payment_done_1786294277779.jpg';

interface LandingPageProps {
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ navigate, onOpenCreateTx }) => {
  const [selectedDemoStage, setSelectedDemoStage] = useState<number>(0);
  const [isAutoAdvance, setIsAutoAdvance] = useState<boolean>(true);

  const demoStages = [
    {
      id: 1,
      code: '01_MarketSquare_Discovery',
      title: 'Marketplace Listing Discovery',
      badge: 'VERIFIED LISTING BADGE',
      image: msq01,
      desc: 'MarketSquare listing displaying the blue Verified with ActionReceipt badge before buyer interacts.',
      targetPos: { xPercent: 54, yPercent: 76 }
    },
    {
      id: 2,
      code: '02_Listing_Details',
      title: 'Seller Trust & Product Inspection',
      badge: 'ACTIONRECEIPT VERIFIED SELLER',
      image: msq02,
      desc: 'Product detail inspection page displaying verified seller identity, storage spec, and condition.',
      targetPos: { xPercent: 61, yPercent: 83 }
    },
    {
      id: 3,
      code: '03_Gemini_Verification',
      title: 'Gemini Real-Time Verification & GPS LocationProof',
      badge: 'GEMINI VERIFICATION WITH GPS LOCATIONPROOF ✓',
      image: msq03,
      desc: 'Gemini 3.6 executing multi-point verification check across identity, payout, product evidence, GPS location consistency, and TruthChain proof.',
      targetPos: { xPercent: 50, yPercent: 50 }
    },
    {
      id: 4,
      code: '04_Purchase_Verified',
      title: 'Purchase Verified & Cleared',
      badge: '100% VERIFIED & SECURE ✓',
      image: msq04,
      desc: 'All security checkpoints pass successfully with full confidence. Ready for protected payment.',
      targetPos: { xPercent: 58, yPercent: 81 }
    },
    {
      id: 5,
      code: '05_Instant_Payment_Checkout',
      title: 'Instant Verified Payment Checkout',
      badge: 'INSTANT VERIFIED CHECKOUT',
      image: msq05,
      desc: 'Because purchase verification and payment verification pass up front, payment is released instantly upon checkout with zero delay.',
      targetPos: { xPercent: 49, yPercent: 90 }
    },
    {
      id: 6,
      code: '06_Instant_Release_Delivery_Placed',
      title: 'Instant Settlement Release & Delivery Placed',
      badge: 'INSTANT RELEASE & DELIVERY PLACED ✓',
      image: msq06,
      desc: 'Payment confirmed and instantly verified! Protection fee routes 85% to Ops Revenue and 15% to Seller Rewards, net payout releases to seller, and order is placed.',
      targetPos: { xPercent: 80, yPercent: 79 }
    }
  ];

  // Auto-advance sequence timer for fluid preview on landing page
  useEffect(() => {
    if (!isAutoAdvance) return;
    const interval = setInterval(() => {
      setSelectedDemoStage((prev) => (prev + 1) % demoStages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoAdvance, demoStages.length]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-slate-950">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-slate-900">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-emerald-400 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Proof-to-Payout Infrastructure for Remote Physical Purchases</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Remote buying shouldn't require <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">blind trust.</span>
              </h1>

              <div className="space-y-1 font-mono text-emerald-400 font-bold text-lg sm:text-xl">
                <p className="tracking-tight text-slate-300 uppercase text-xs">ACTIONRECEIPT</p>
                <p>Don't trust the listing. Make the transaction prove itself.</p>
              </div>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
                ActionReceipt verifies the seller, payout destination, physical item, and <strong>LocationProof</strong> before protected payment becomes available.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  id="hero-get-started-btn"
                  onClick={onOpenCreateTx}
                  className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl shadow-emerald-500/25 transition transform active:scale-95 flex items-center space-x-2 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>START PROTECTED TRANSACTION</span>
                </button>

                <button
                  id="hero-watch-demo-btn"
                  onClick={() => navigate('/demo')}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition flex items-center space-x-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>3-MIN DEMO VIDEO</span>
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-4 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-emerald-400 font-bold block">100% TruthChain</span>
                  <span>Identity + Product + Payout</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">LocationProof ✓</span>
                  <span>Device GPS & Store Address</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">PackCheck</span>
                  <span>Sealed Passport</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Animated Visual */}
            <div className="lg:col-span-5">
              <HeroTrustVisual />
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEMO VIDEO GALLERY & STAGES (FRAMER MOTION) */}
      <section className="py-20 bg-slate-900/40 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
              As Seen in the Video Walkthrough
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              6-Stage Verified Purchase Experience
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Explore the exact MarketSquare listing and verification sequence featured in our 3-minute demo video.
            </p>
          </div>

          {/* Interactive Stage Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
              {demoStages.map((stage, idx) => {
                const isSelected = selectedDemoStage === idx;
                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setSelectedDemoStage(idx);
                      setIsAutoAdvance(false);
                    }}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10 font-bold'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] block opacity-60">STAGE 0{stage.id}</span>
                    <span className="truncate block font-semibold text-[11px] mt-0.5">{stage.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Display Framer Motion Stage Image & Details */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
            
            {/* Visual Image Screen */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative aspect-video flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`landing-demo-${selectedDemoStage}`}
                  src={demoStages[selectedDemoStage].image}
                  alt={demoStages[selectedDemoStage].code}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain bg-slate-950"
                />
              </AnimatePresence>

              {/* Animated Target Pointer Overlay for Real Action Visual */}
              {demoStages[selectedDemoStage].targetPos && (
                <motion.div
                  key={`pointer-${selectedDemoStage}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute pointer-events-none flex items-center space-x-1.5 bg-emerald-500/90 text-slate-950 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/30 border border-white/20"
                  style={{
                    left: `${demoStages[selectedDemoStage].targetPos.xPercent}%`,
                    top: `${demoStages[selectedDemoStage].targetPos.yPercent}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <MousePointer className="w-3 h-3 fill-current animate-bounce" />
                  <span>ACTION STEP</span>
                </motion.div>
              )}

              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur px-3 py-1 rounded-lg border border-slate-800 text-[11px] font-mono font-bold text-emerald-400">
                {demoStages[selectedDemoStage].code}
              </div>

              <button
                onClick={() => setIsAutoAdvance(!isAutoAdvance)}
                className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono font-bold text-slate-300 hover:text-white flex items-center space-x-1.5 cursor-pointer"
              >
                {isAutoAdvance ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pause Auto-Sequence</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Auto-Play Sequence</span>
                  </>
                )}
              </button>
            </div>

            {/* Stage Description & Controls */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-2 font-mono">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-bold inline-block">
                  {demoStages[selectedDemoStage].badge}
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  {demoStages[selectedDemoStage].title}
                </h3>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-sans">
                {demoStages[selectedDemoStage].desc}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
                <button
                  onClick={() => navigate('/demo')}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold transition flex items-center space-x-2 cursor-pointer shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY FULL 3-MIN VIDEO</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURE: ACTIONRECEIPT LOCATIONPROOF (GPS VERIFICATION) */}
      <section className="py-20 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20 font-bold">
              <MapPin className="w-4 h-4" />
              <span>NEW: LOCATIONPROOF EVIDENCE ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              ActionReceipt LocationProof
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Location becomes another piece of transaction evidence. ActionReceipt verifies that the seller, business, product, and transaction are occurring where claimed — with privacy-first guarantees.
            </p>
          </div>

          {/* LIVE DEMO LOCATIONPROOF CARD */}
          <div className="max-w-4xl mx-auto">
            <LocationProof
              country="United Kingdom"
              region="Greater London"
              city="London"
              status="VERIFIED"
              gpsAccuracyMeters={10}
              ipNetworkMatched={true}
              registeredAddressMatched={true}
              isPrivacyMode={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left font-mono text-xs">
            
            <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Multi-Signal Location Check</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                Reconciles device GPS + IP/Network consistency + verified store address + LiveCheck capture location timestamp into a single location proof hash.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Privacy-First Architecture</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                For social sellers, private addresses are never exposed to buyers. Buyers see: <strong className="text-emerald-400 font-mono">"Seller Location Verified ✓ Manchester, UK"</strong> without exposing live private coordinates.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Physical Shop Verification</h3>
              <p className="text-slate-400 font-sans leading-relaxed">
                For physical retail shops, buyers can view verified business address pins and confirm physical store authority prior to high-value purchases.
              </p>
            </div>

          </div>

          {/* TruthChain Flow with LocationProof */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 max-w-4xl mx-auto font-mono text-xs text-center space-y-3">
            <span className="text-emerald-400 font-bold uppercase tracking-wider block">UNBROKEN TRUTHCHAIN EVIDENCE PIPELINE</span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-slate-300">
              <span className="px-2.5 py-1 bg-slate-950 rounded border border-slate-800">SELLER IDENTITY ✓</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-slate-950 rounded border border-slate-800">PAYOUT MATCHED ✓</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30 font-bold">LOCATIONPROOF ✓</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-slate-950 rounded border border-slate-800">LIVECHECK TOKEN ✓</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-emerald-400 text-slate-950 rounded font-bold">READY TO PAY</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. AI IN PRODUCTION & VALUE-BASED PRICING HIGHLIGHT */}
      <section className="py-20 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                AI in Production & Global Pricing
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Value-based protection fees (FREE under £5, £0.30 – £4.50 per tier).
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                ActionReceipt provides democratic trust for every purchase. Transactions under £5 are <strong className="text-emerald-400">100% FREE</strong> (£0 fee), while higher value orders feature predictable tier-based fees from £0.30 to £4.50. Every paid fee is automatically split: <strong className="text-emerald-400">85% ActionReceipt Ops Revenue</strong> and <strong className="text-amber-400">15% Seller Rewards</strong>.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">FREE FOR SMALL PURCHASES</span>
                  <span className="text-slate-300 text-[11px]">Orders &lt; £5.00 feature £0.00 protection fees.</span>
                </div>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold block">15% SELLER REWARDS</span>
                  <span className="text-slate-300 text-[11px]">Reinvested into verified seller cashback and perks.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="landing-integrate-btn"
                  onClick={() => navigate('/integrate')}
                  className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center space-x-2 cursor-pointer"
                >
                  <Cpu className="w-5 h-5" />
                  <span>VIEW INTEGRATION & DEVELOPER PORTAL</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 font-mono text-xs">
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-xs">
                  <span className="font-bold text-white">PRODUCTION SETTLEMENT LOG</span>
                  <span className="text-emerald-400 font-bold">VALUE-BASED PROTECTION TIER</span>
                </div>
                <div className="space-y-2 text-slate-300 text-xs">
                  <div className="flex justify-between">
                    <span>Item Value (£100–£300 Tier):</span>
                    <span>£150.00</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-bold">
                    <span>Value Protection Fee:</span>
                    <span>£1.20</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold pl-2 border-l border-emerald-500/30">
                    <span>85% ActionReceipt Ops Revenue:</span>
                    <span>£1.02</span>
                  </div>
                  <div className="flex justify-between text-amber-300 font-bold pl-2 border-l border-amber-500/30">
                    <span>15% Verified Seller Reward:</span>
                    <span>£0.18</span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                    <span>Seller Net Settlement:</span>
                    <span>£148.80</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-sans">
                  Includes 7-Agent Trust Engine verification, LocationProof GPS check, LiveCheck dynamic token challenge, and deterministic policy engine authorization.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. REVENUE & DIRECT-TO-OPS SETTLEMENT FLOW WALKTHROUGH */}
      <section className="py-12 bg-slate-900/30 border-b border-slate-900">
        <RevenueFlowWalkthrough navigate={navigate} onOpenCreateTx={onOpenCreateTx} />
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to make your remote transactions prove themselves?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            ActionReceipt protects buyers and builds instant trust for genuine social sellers and online merchants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenCreateTx}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-xl shadow-emerald-500/20 cursor-pointer"
            >
              START PROTECTED TRANSACTION
            </button>
            <button
              onClick={() => navigate('/integrate')}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition cursor-pointer"
            >
              INTEGRATE FOR MERCHANTS
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

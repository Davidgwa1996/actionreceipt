import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, UserCheck, Cpu, DollarSign, Package,
  CheckCircle2, ArrowRight, Zap, Check, MapPin, Building2, Lock, Sparkles,
  AlertTriangle, ArrowDown, ChevronRight, Layers, FileCode
} from 'lucide-react';

interface HowItWorksPageProps {
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
  initialTab?: 'how-it-works' | 'pricing';
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ 
  navigate, 
  onOpenCreateTx,
  initialTab = 'how-it-works'
}) => {
  const [activePage, setActivePage] = useState<'how-it-works' | 'pricing'>(initialTab);

  useEffect(() => {
    setActivePage(initialTab);
  }, [initialTab]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12 text-left">
        
        {/* Navigation Bar / Tab Switcher */}
        <div className="flex justify-center border-b border-slate-800 pb-4">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 inline-flex items-center space-x-2 font-mono text-xs">
            <button
              onClick={() => { setActivePage('how-it-works'); navigate('/how-it-works'); }}
              className={`px-5 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center space-x-2 ${
                activePage === 'how-it-works'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>HOW IT WORKS</span>
            </button>
            <button
              onClick={() => { setActivePage('pricing'); navigate('/pricing'); }}
              className={`px-5 py-2.5 rounded-xl font-bold transition cursor-pointer flex items-center space-x-2 ${
                activePage === 'pricing'
                  ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>PRICING</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PAGE 1: HOW IT WORKS */}
        {/* ========================================================================= */}
        {activePage === 'how-it-works' && (
          <div className="space-y-16">
            
            {/* SECTION A — HERO */}
            <div className="text-center max-w-3xl mx-auto space-y-5">
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 font-bold inline-block">
                Pre-Payment Trust Infrastructure
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                HOW ACTIONRECEIPT WORKS
              </h1>
              <p className="text-emerald-400 text-lg font-bold font-mono">
                Verify the transaction before you pay.
              </p>
              <p className="text-slate-300 text-base leading-relaxed font-sans max-w-2xl mx-auto">
                ActionReceipt checks the seller, payout destination, listing, physical product and relevant location evidence before protected payment becomes available.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/pay/AR-DEMO-001')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>TRY LIVE SIMULATOR</span>
                </button>
                <button
                  onClick={() => navigate('/integrate')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-mono font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>INTEGRATE ACTIONRECEIPT</span>
                </button>
              </div>
            </div>

            {/* SECTION B — SIMPLE CUSTOMER JOURNEY */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8 shadow-2xl">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                  CORE ACTIONRECEIPT FLOW
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-wider">
                  SIMPLE CUSTOMER JOURNEY
                </h2>
                <p className="text-slate-400 text-xs font-sans">
                  From finding a product listing to order placement in transparent, verified stages
                </p>
              </div>

              {/* Core Flow Summary Diagram Strip */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto">
                <div className="flex items-center space-x-2 min-w-[850px] justify-between text-center">
                  <span className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 font-bold">REMOTE PRODUCT LISTING</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="px-2.5 py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">BUYER SELECTS PRODUCT → VERIFY PURCHASE</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-emerald-300 font-bold">MULTI-AGENT VERIFICATION</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="px-2.5 py-1.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-bold">PURCHASE VERIFIED ✓</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="px-2.5 py-1.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">PAY WITH ACTIONRECEIPT</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="px-2.5 py-1.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">PAYMENT CONFIRMED ✓</span>
                  <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="px-2.5 py-1.5 rounded bg-emerald-400 text-slate-950 font-extrabold">ORDER PLACED ✓</span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-xs">
                {/* Stage 1 */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-slate-300 font-bold flex items-center justify-center border border-slate-800">1</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">REMOTE PRODUCT LISTING</h3>
                      <p className="text-slate-400 font-sans text-xs">Buyer finds a remote product online across social, classifieds, or store channels.</p>
                    </div>
                  </div>
                  <span className="text-slate-500 text-[10px] uppercase bg-slate-900 px-2.5 py-1 rounded border border-slate-800 font-bold">Initial Context</span>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-emerald-500" /></div>

                {/* Stage 2 */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-950/10">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">2</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">BUYER SELECTS PRODUCT → VERIFY PURCHASE</h3>
                      <p className="text-slate-400 font-sans text-xs">Buyer initiates transaction by clicking <span className="text-emerald-400 font-mono font-bold">VERIFY PURCHASE</span> to trigger Purchase Verification.</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">Purchase Verification</span>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-emerald-500" /></div>

                {/* Stage 3 */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-900 text-teal-400 font-bold flex items-center justify-center border border-slate-800">3</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">ACTIONRECEIPT MULTI-AGENT VERIFICATION</h3>
                      <p className="text-slate-400 font-sans text-xs">Master orchestrator invokes 6 specialist AI agents to analyze pre-payment risk parameters.</p>
                    </div>
                  </div>
                  <span className="text-teal-400 text-[10px] font-bold bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20">Automated AI Assessment</span>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-emerald-500" /></div>

                {/* Stage 4: 6 Verification Pillars Box */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">4</span>
                      <span>ALL PRE-PAYMENT CHECKS COMPLETED</span>
                    </div>
                    <span className="text-[10px] text-slate-400">100% Pass Threshold</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-white font-bold text-[11px]">SELLER VERIFIED</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-white font-bold text-[11px]">PAYOUT DESTINATION VERIFIED</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-white font-bold text-[11px]">LISTING VERIFIED</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-white font-bold text-[11px]">PRODUCT VERIFIED</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                      <span className="text-white font-bold text-[11px]">LOCATIONPROOF VERIFIED</span>
                      <span className="text-emerald-400 font-bold">✓</span>
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-teal-500/40 flex items-center justify-between bg-teal-950/20">
                      <span className="text-teal-300 font-bold text-[11px]">TRUTHCHAIN CONSISTENT</span>
                      <span className="text-teal-400 font-bold">✓</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-emerald-500" /></div>

                {/* Stage 5 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/50 space-y-3 bg-emerald-950/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/30 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/40">5</span>
                      <div>
                        <h3 className="font-extrabold text-emerald-400 text-sm sm:text-base">PURCHASE VERIFIED ✓ → READY TO PAY</h3>
                        <p className="text-slate-300 font-sans text-xs">All checks pass. Protected payment button unlocks for buyer.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/pay/AR-DEMO-001')}
                      className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 shrink-0"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>PAY WITH ACTIONRECEIPT</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-emerald-500" /></div>

                {/* Stage 6 */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-purple-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-950/10">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center border border-purple-500/30">6</span>
                    <div>
                      <h3 className="font-bold text-white text-sm">BUYER AUTHENTICATION → REGULATED PAYMENT PROVIDER</h3>
                      <p className="text-slate-400 font-sans text-xs">Buyer completes authentication with regulated payment institution. Event receives <span className="text-purple-300 font-bold">PAYMENT CONFIRMED ✓</span> state.</p>
                    </div>
                  </div>
                  <span className="text-purple-300 text-[10px] font-bold bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">PAYMENT CONFIRMED ✓</span>
                </div>

                <div className="flex justify-center"><ArrowDown className="w-4 h-4 text-emerald-500" /></div>

                {/* Stage 7 */}
                <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/60 space-y-2 bg-emerald-950/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-950 font-bold flex items-center justify-center">7</span>
                      <div>
                        <h3 className="font-extrabold text-white text-base tracking-wide">ORDER PLACED ✓ → ACTIONRECEIPT COMPLETE</h3>
                        <p className="text-slate-300 font-sans text-xs">ActionReceipt's pre-payment trust and verification mission is successfully completed.</p>
                      </div>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs bg-emerald-500/20 px-3 py-1 rounded border border-emerald-500/30">MISSION COMPLETE ✓</span>
                  </div>
                </div>

              </div>

              {/* After Order Placed Banner */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center font-mono">
                <span className="text-slate-400 text-xs font-bold block uppercase tracking-wider">AFTER ORDER PLACED</span>
                <p className="text-slate-200 text-sm font-sans mt-1">
                  “Your seller or marketplace continues through its normal fulfilment process.”
                </p>
              </div>
            </div>

            {/* SECTION C — SIMPLE MULTI-AGENT ARCHITECTURE */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8 shadow-2xl">
              <div className="text-center space-y-2">
                <span className="text-xs font-mono uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Multi-Agent Trust Architecture</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  THE AI BEHIND ACTIONRECEIPT
                </h2>
                <p className="text-slate-300 text-xs font-sans">
                  One orchestrator. Six specialist Gemini agents. One deterministic payment rule.
                </p>
              </div>

              {/* Architecture Visual Diagram */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto space-y-4">
                <div className="flex flex-col items-center space-y-2 min-w-[320px]">
                  <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 font-bold">BUYER</div>
                  <ArrowDown className="w-4 h-4 text-emerald-500" />
                  <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 font-bold">PRODUCT LISTING</div>
                  <ArrowDown className="w-4 h-4 text-emerald-500" />
                  <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 font-bold">VERIFY PURCHASE</div>
                  <ArrowDown className="w-4 h-4 text-emerald-500" />
                  
                  {/* Master Orchestrator */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/40 text-center space-y-1 w-full max-w-md shadow-lg">
                    <span className="text-emerald-400 font-extrabold block text-sm">PURCHASE ORCHESTRATOR</span>
                    <span className="text-slate-400 text-[10px] block">Gemini 3.6 Flash</span>
                    <span className="text-slate-300 text-xs font-sans block">Decides required checks and manages workflow</span>
                  </div>

                  <ArrowDown className="w-4 h-4 text-emerald-500" />

                  {/* 6 Specialist Agents Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-emerald-400 font-bold block">LISTING AGENT</span>
                      <span className="text-[10px] text-slate-400 font-sans">Assesses listing claims</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-emerald-400 font-bold block">SELLER AGENT</span>
                      <span className="text-[10px] text-slate-400 font-sans">Verifies seller & authority</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-emerald-400 font-bold block">PAYOUT AGENT</span>
                      <span className="text-[10px] text-slate-400 font-sans">Matches beneficiary destination</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                      <span className="text-emerald-400 font-bold block">LOCATIONPROOF AGENT</span>
                      <span className="text-[10px] text-slate-400 font-sans">Checks seller/product geography</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center col-span-1 sm:col-span-2">
                      <span className="text-emerald-400 font-bold block">PRODUCT / LIVECHECK AGENT</span>
                      <span className="text-[10px] text-slate-400 font-sans">Proves physical item possession via gesture tokens</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-emerald-500" />

                  {/* TruthChain */}
                  <div className="p-3.5 bg-slate-900 rounded-xl border border-teal-500/40 text-center w-full max-w-md">
                    <span className="text-teal-300 font-bold block">TRUTHCHAIN AGENT</span>
                    <span className="text-[10px] text-slate-400 font-sans">Compares all evidence sources for contradiction reasoning</span>
                  </div>

                  <ArrowDown className="w-4 h-4 text-emerald-500" />

                  {/* Deterministic Policy Engine */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-amber-500/40 text-center w-full max-w-md space-y-1">
                    <span className="text-amber-400 font-bold block">DETERMINISTIC POLICY ENGINE</span>
                    <span className="text-[10px] text-slate-400 font-sans">Evaluates 100% pass condition across all 6 agent outputs</span>
                  </div>

                  <ArrowDown className="w-4 h-4 text-emerald-500" />

                  {/* State Fork */}
                  <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 text-center">
                      <span className="text-emerald-400 font-bold block">PURCHASE VERIFIED ✓</span>
                      <span className="text-[10px] text-slate-300 font-sans">Ready to Pay</span>
                    </div>
                    <div className="p-3 bg-rose-950/40 rounded-xl border border-rose-500/40 text-center">
                      <span className="text-rose-400 font-bold block">PAYMENT LOCKED ✕</span>
                      <span className="text-[10px] text-slate-300 font-sans">Scam Blocked</span>
                    </div>
                  </div>

                  <ArrowDown className="w-4 h-4 text-emerald-500" />

                  <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 font-bold">
                    PAY WITH ACTIONRECEIPT → REGULATED PROVIDER → PAYMENT CONFIRMED ✓ → ORDER PLACED ✓
                  </div>
                </div>
              </div>

              {/* 7 Small Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">PURCHASE ORCHESTRATOR</span>
                  <p className="text-slate-400 font-sans text-[11px]">Decides which checks the transaction requires.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">LISTING AGENT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Checks the product listing and its claims.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">SELLER AGENT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Checks who is actually selling.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">PAYOUT AGENT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Checks where the money is intended to go.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">LOCATIONPROOF AGENT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Checks relevant seller/product geography.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">PRODUCT / LIVECHECK AGENT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Proves the seller possesses the physical item.</p>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 col-span-1 sm:col-span-2">
                  <span className="text-emerald-400 font-bold block">TRUTHCHAIN AGENT</span>
                  <p className="text-slate-400 font-sans text-[11px]">Compares all evidence for contradictions.</p>
                </div>
              </div>

              {/* Highlighted Rule Box */}
              <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 text-center font-mono space-y-1">
                <span className="text-emerald-400 font-extrabold text-sm sm:text-base block tracking-wider">
                  AI INTERPRETS EVIDENCE. CODE CONTROLS PAYMENT ELIGIBILITY. PAYMENT FOLLOWS PROOF.
                </span>
              </div>
            </div>

            {/* SECTION D — REAL EXAMPLE */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6 shadow-2xl font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest block font-bold">Transaction Verification Record</span>
                  <h3 className="font-extrabold text-xl text-white">REAL TRANSACTION VERIFICATION EXAMPLE</h3>
                </div>
                <span className="text-xs text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">Ref: AR-2026-XPHONE</span>
              </div>

              {/* Item Details */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Product</span>
                  <span className="text-white font-bold">XPhone Pro 256GB</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Price</span>
                  <span className="text-emerald-400 font-bold">£650.00</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Seller</span>
                  <span className="text-white font-bold">TechWorld Store</span>
                </div>
              </div>

              {/* Verification Signals Checklist */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Seller Confirmed', ok: true },
                  { label: 'Payout Confirmed', ok: true },
                  { label: 'Listing Confirmed', ok: true },
                  { label: 'Product Confirmed', ok: true },
                  { label: 'Location Confirmed', ok: true },
                  { label: 'TruthChain Consistent', ok: true }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-sans">{item.label}</span>
                    <span className="text-emerald-400 font-bold">✓</span>
                  </div>
                ))}
              </div>

              {/* Purchase Verified Banner */}
              <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/50 space-y-3 text-center">
                <span className="text-emerald-400 font-extrabold text-lg block">PURCHASE VERIFIED ✓</span>
                <span className="text-slate-300 text-xs font-sans block">READY TO PAY</span>
                <button
                  onClick={() => navigate('/pay/AR-DEMO-001')}
                  className="px-8 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg cursor-pointer"
                >
                  PAY WITH ACTIONRECEIPT
                </button>
              </div>

              {/* Final State Box */}
              <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold">PAYMENT CONFIRMED ✓</span>
                </div>
                <span className="text-emerald-400 font-bold">ORDER PLACED ✓</span>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: PRICING */}
        {/* ========================================================================= */}
        {activePage === 'pricing' && (
          <div className="space-y-16">
            
            {/* SECTION A — PRICING HERO */}
            <div className="text-center max-w-3xl mx-auto space-y-5">
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 font-bold inline-block">
                Transparent Order-Based Protection Pricing
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                SIMPLE VALUE-BASED PRICING
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
                Small purchases stay affordable. ActionReceipt charges once per successful protected order — not per item.
              </p>
            </div>

            {/* SECTION B — PRICING TABLE & ORDER-LEVEL RULE */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-8 shadow-2xl">
              <div className="text-center space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono uppercase tracking-wider">
                  OFFICIAL PROTECTION FEE TIERS
                </h2>
                <p className="text-slate-400 text-xs font-sans">
                  Fee is calculated once against the total protected order value.
                </p>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center space-y-2 bg-emerald-950/10">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">UNDER £5.00</span>
                  <span className="text-2xl font-extrabold text-emerald-400 block">FREE</span>
                  <span className="text-[10px] text-slate-400 block">£0.00 Fee | £0.00 Reward</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£5.00 – £9.99</span>
                  <span className="text-2xl font-extrabold text-white block">£0.30</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.045 | OPS 85%: £0.255</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£10.00 – £14.99</span>
                  <span className="text-2xl font-extrabold text-white block">£0.35</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.0525 | OPS 85%: £0.2975</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£15.00 – £44.99</span>
                  <span className="text-2xl font-extrabold text-white block">£0.40</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.06 | OPS 85%: £0.34</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£45.00 – £99.99</span>
                  <span className="text-2xl font-extrabold text-white block">£0.65</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.0975 | OPS 85%: £0.5525</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£100.00 – £299.99</span>
                  <span className="text-2xl font-extrabold text-white block">£1.20</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.18 | OPS 85%: £1.02</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/40 text-center space-y-2 bg-emerald-950/20">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£300.00 – £499.99</span>
                  <span className="text-2xl font-extrabold text-emerald-400 block">£2.50</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.375 | OPS 85%: £2.125</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/40 text-center space-y-2 bg-emerald-950/20">
                  <span className="text-xs text-slate-400 block font-bold">ORDER VALUE</span>
                  <span className="text-lg font-bold text-white block">£500.00 – £800.00</span>
                  <span className="text-2xl font-extrabold text-emerald-400 block">£4.50</span>
                  <span className="text-[10px] text-emerald-400 block">Seller 15%: £0.675 | OPS 85%: £3.825</span>
                </div>
              </div>

              {/* Order Level Explanation Banner */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-3 font-mono text-xs">
                <p className="text-emerald-400 font-bold">
                  “One ActionReceipt protection fee applies to the whole protected order — not every individual item.”
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-sans text-xs pt-2">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white block font-mono text-[11px]">EXAMPLE 1: MICRO-BASKET</span>
                    <p className="text-slate-300">5 products in basket (Total basket = £4.80)</p>
                    <span className="text-emerald-400 font-mono font-bold block">Protection Fee: FREE (£0.00)</span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-white block font-mono text-[11px]">EXAMPLE 2: HIGH-VALUE BASKET</span>
                    <p className="text-slate-300">4 products in basket (Total basket = £72.00)</p>
                    <span className="text-emerald-400 font-mono font-bold block">Protection Fee: £0.65</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION C — SELLERS EARN WITH ACTIONRECEIPT */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 space-y-8 shadow-2xl bg-emerald-950/10">
              <div className="text-center space-y-2">
                <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-bold">
                  SELLER INCENTIVE ENGINE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-wider">
                  SELLERS EARN WITH ACTIONRECEIPT
                </h2>
                <p className="text-slate-300 text-sm font-sans max-w-2xl mx-auto">
                  Verified sellers earn 15% of the ActionReceipt protection fee on every successful paid protected order.
                </p>
              </div>

              {/* Visual Split Diagram */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-6 text-center font-mono">
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-extrabold text-sm">
                  PROTECTION FEE
                </div>

                <div className="flex justify-center items-center space-x-8 text-xs">
                  <div className="flex-1 p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1">
                    <span className="text-emerald-400 font-extrabold text-sm block">SELLER REWARD</span>
                    <span className="text-2xl font-black text-white block">15%</span>
                    <span className="text-[10px] text-slate-400 block">Accrued to Seller Ledger</span>
                  </div>

                  <div className="flex-1 p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                    <span className="text-slate-300 font-extrabold text-sm block">ACTIONRECEIPT OPS</span>
                    <span className="text-2xl font-black text-white block">85%</span>
                    <span className="text-[10px] text-slate-400 block">Platform Operational Revenue</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-300 text-xs text-left space-y-1">
                  <span className="font-bold text-white block text-[11px]">EXAMPLE (£100–£300 PROTECTED ORDER):</span>
                  <p className="text-slate-300 font-sans">
                    Protection Fee: <strong className="text-white">£1.20</strong> | Seller earns: <strong className="text-emerald-400">£0.18</strong> | ActionReceipt OPS: <strong className="text-slate-200">£1.02</strong>
                  </p>
                </div>

                <p className="text-slate-400 text-xs font-sans">
                  Seller Rewards automatically accumulate across successful protected sales and can be monitored via the Seller Dashboard.
                </p>
              </div>
            </div>

            {/* SECTION D — SELLER-FACING VALUE PROPOSITION */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-white font-mono uppercase tracking-wider">
                  SELL MORE. PROVE MORE. EARN REWARDS.
                </h2>
                <p className="text-slate-300 text-sm font-sans max-w-xl mx-auto">
                  Every successful paid ActionReceipt order generates a Seller Reward equal to 15% of the protection fee.
                </p>
                <p className="text-slate-400 text-xs font-sans italic max-w-lg mx-auto">
                  “ActionReceipt protects your buyer while rewarding your business for completing verified transactions.”
                </p>
              </div>
            </div>

            {/* SECTION E — WHO CAN USE IT */}
            <div className="bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-800 space-y-6">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-extrabold text-white font-mono uppercase tracking-wider">
                  WHO CAN USE ACTIONRECEIPT?
                </h2>
                <p className="text-slate-400 text-xs font-sans">Designed for every type of remote seller and platform</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs text-center">
                {[
                  'PRIVATE SELLER',
                  'SOCIAL SELLER',
                  'SMALL BUSINESS',
                  'ONLINE STORE',
                  'MARKETPLACE',
                  'LARGE PLATFORM'
                ].map((type) => (
                  <div key={type} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 font-bold flex items-center justify-center">
                    {type}
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => navigate('/integrate')}
                  className="px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg transition cursor-pointer inline-flex items-center space-x-2"
                >
                  <span>CHOOSE HOW TO INTEGRATE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

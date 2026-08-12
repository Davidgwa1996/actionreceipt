import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CheckCircle2, ArrowRight, Building2, Wallet, 
  Sparkles, DollarSign, RefreshCw, Play, Pause, ChevronRight, 
  ChevronLeft, Smartphone, Lock, FileCheck, Layers, ArrowDown, TrendingUp, PieChart as PieIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface RevenueFlowWalkthroughProps {
  navigate?: (route: string) => void;
  onOpenCreateTx?: () => void;
}

export interface FlowStep {
  stepNumber: number;
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  buyerFeeling: string;
  settlementDetail: string;
  diagramType: 'checkout' | 'split' | 'ops' | 'seller' | 'scale';
}

export const FLOW_STEPS: FlowStep[] = [
  {
    stepNumber: 1,
    id: 'buyer_checkout',
    badge: 'STEP 1: ZERO-FRICTION BUYER CHECKOUT',
    title: 'Buyer Pays Protected Order Price (£650.00)',
    subtitle: 'Value-based protection fee is included transparently in checkout',
    description: 'When the buyer purchases a protected order (e.g. £650.00 total), ActionReceipt protection applies automatically (£4.50 protection fee for £500–£800 tier). Orders under £5 remain 100% FREE.',
    buyerFeeling: '100% Smooth & Transparent — Buyer receives pre-payment verification confidence',
    settlementDetail: 'Full payment authorized securely via ActionReceipt Verification Gateway',
    diagramType: 'checkout'
  },
  {
    stepNumber: 2,
    id: 'instant_settlement_split',
    badge: 'STEP 2: AUTOMATIC 85/15 REVENUE & REWARD SPLIT',
    title: 'Payment Gateway Auto-Splits Protection Fee Stream (£4.50)',
    subtitle: '85% routes to Ops Revenue while 15% accrues as Seller Reward',
    description: 'Upon payment confirmation, the ActionReceipt Settlement Engine automatically splits the £4.50 protection fee: 85% (£3.825) routes to ActionReceipt Ops Revenue, while 15% (£0.675) accrues to the verified seller as an incentive reward.',
    buyerFeeling: 'Automatic & Invisible — Happens instantly in real-time behind the scenes',
    settlementDetail: '£3.825 ➔ Direct Ops Revenue | £0.675 ➔ Seller Reward Balance | £645.50 Net Settlement ➔ Seller',
    diagramType: 'split'
  },
  {
    stepNumber: 3,
    id: 'direct_to_ops',
    badge: 'STEP 3: DIRECT-TO-OPS REVENUE ACCOUNTING',
    title: '85% Arrives Directly at ActionReceipt Ops Treasury (£3.825)',
    subtitle: '100% guaranteed revenue collection without manual invoicing',
    description: 'Because the 85% platform fee is deducted directly at checkout settlement (£3.825 for a £650 transaction) and routes straight to Ops, ActionReceipt experiences zero bad debt, zero unpaid invoices, and zero collection delays.',
    buyerFeeling: 'Guaranteed Protection — Platform earns revenue while protecting buyer funds',
    settlementDetail: 'Direct API Webhook logs 85% platform revenue instantly on Ops Ledger (/ops)',
    diagramType: 'ops'
  },
  {
    stepNumber: 4,
    id: 'seller_instant_payout',
    badge: 'STEP 4: SELLER REWARD ACCRUAL & INSTANT PAYOUT',
    title: 'Seller Receives Net Settlement (£645.50) + Earns 15% Reward (£0.675)',
    subtitle: 'Verification rewards high-trust sellers for every protected transaction',
    description: 'Because purchase verification and payment verification pass thoroughly up front, net item funds (£645.50) are instantly released to the seller bank account immediately upon payment verification, while earning a 15% Seller Reward (£0.675).',
    buyerFeeling: 'Purchase & Payment Verified — Funds released instantly, order placed for merchant fulfilment',
    settlementDetail: 'Net item payment (£645.50) disbursed instantly to seller + 15% Seller Reward (£0.675) added to ledger',
    diagramType: 'seller'
  },
  {
    stepNumber: 5,
    id: 'scale_economics',
    badge: 'STEP 5: HIGH-SCALE PLATFORM MONETIZATION',
    title: 'Scales Frictionlessly Across Millions of Value-Based Tiers',
    subtitle: 'Tiered protection fees (£0.30 to £4.50) aggregate into high-margin platform revenue',
    description: 'At 100,000 daily protected transactions with a balanced basket value mix, ActionReceipt generates over £35,000 daily in OPS revenue while distributing millions in seller rewards.',
    buyerFeeling: 'Universal Ecosystem Standard — Protecting every transaction everywhere',
    settlementDetail: 'Scalable automated revenue pipeline with sustainable seller reward incentives',
    diagramType: 'scale'
  }
];

export const RevenueFlowWalkthrough: React.FC<RevenueFlowWalkthroughProps> = ({ navigate, onOpenCreateTx }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const currentStep = FLOW_STEPS[activeStepIndex];

  // Auto-advance through steps like an app preview story
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStepIndex(prev => (prev + 1) % FLOW_STEPS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setActiveStepIndex(prev => (prev + 1) % FLOW_STEPS.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setActiveStepIndex(prev => (prev - 1 + FLOW_STEPS.length) % FLOW_STEPS.length);
  };

  return (
    <div className="bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-10 text-left">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>PLATFORM MONETIZATION & DIRECT SETTLEMENT FLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How ActionReceipt Makes Money (Direct-to-Ops Flow)
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans">
            Buyers pay normal listing price without extra checkout surcharges. Value protection fees (FREE under £5, £0.30–£1.20) route <strong>strictly as 85% Ops Revenue and 15% Seller Rewards</strong> — settled instantly upon transaction authorization.
          </p>
        </div>

        {/* INTERACTIVE MOBILE / CARD WALKTHROUGH PREVIEW */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* STEP PROGRESS NAVIGATION BAR */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800 font-mono text-xs">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-xs">
                {currentStep.badge}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center space-x-1.5 text-xs ${
                  isAutoPlaying 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold' 
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isAutoPlaying ? 'PAUSE WALKTHROUGH' : 'AUTO-PLAY FLOW'}</span>
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
                  title="Previous Step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
                  title="Next Step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* STEP TABS INDICATOR */}
          <div className="grid grid-cols-5 gap-2 font-mono text-[11px]">
            {FLOW_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setActiveStepIndex(idx);
                }}
                className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                  activeStepIndex === idx
                    ? 'bg-emerald-400 text-slate-950 font-bold border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="truncate">0{step.stepNumber}. {step.id.replace('_', ' ').toUpperCase()}</div>
              </button>
            ))}
          </div>

          {/* MAIN VISUAL CARD CONTAINER - DUAL PANEL (LEFT TEXT DETAILS, RIGHT ANIMATED MOBILE APP CARD MOCKUP) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* LEFT DETAILS PANEL */}
            <div className="lg:col-span-6 space-y-5 text-left font-sans">
              
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  {currentStep.title}
                </h3>
                <p className="text-emerald-400 font-mono text-xs font-bold">
                  {currentStep.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {currentStep.description}
              </p>

              {/* BUYER EXPERIENCE HIGHLIGHT */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 font-mono text-xs">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>BUYER EXPERIENCE & FEELING:</span>
                </div>
                <p className="text-slate-200 font-sans text-xs pl-6">
                  {currentStep.buyerFeeling}
                </p>
              </div>

              {/* SETTLEMENT LOGIC HIGHLIGHT */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl space-y-1.5 font-mono text-xs">
                <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>DIRECT-TO-OPS SETTLEMENT LOGIC:</span>
                </div>
                <p className="text-emerald-200 font-sans text-xs pl-6">
                  {currentStep.settlementDetail}
                </p>
              </div>

            </div>

            {/* RIGHT ANIMATED MOBILE / APP FRAME MOCKUP (MATCHING USER VIDEO STYLE) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-sm bg-slate-950 rounded-[2.5rem] border-4 border-slate-800 p-4 shadow-2xl relative overflow-hidden font-mono text-xs">
                
                {/* TOP MOBILE STATUS BAR */}
                <div className="flex justify-between items-center px-3 py-1 text-[10px] text-slate-500 border-b border-slate-900 pb-2 mb-3">
                  <span className="font-bold text-slate-400">10:42 AM</span>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">5G</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* ANIMATED STEP CONTENT MOCKUP */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    
                    {/* MOCKUP HEADER */}
                    <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white text-[11px]">MarketSquare App</div>
                          <div className="text-[9px] text-slate-400">ActionReceipt Engine</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">
                        VERIFIED
                      </span>
                    </div>

                    {/* DIAGRAM 1: BUYER CHECKOUT */}
                    {currentStep.diagramType === 'checkout' && (
                      <div className="space-y-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Checkout Summary</div>
                        <div className="flex justify-between items-center text-white font-extrabold text-sm">
                          <span>XPhone Pro 256GB</span>
                          <span>£650.00</span>
                        </div>
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] space-y-1">
                          <div className="flex items-center space-x-1 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>ActionReceipt AI Protection: INCLUDED</span>
                          </div>
                          <p className="text-slate-300 font-sans text-[10px]">Zero extra fee charged to buyer</p>
                        </div>
                        <div className="w-full py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-center text-xs shadow-md">
                          CONFIRM PAYMENT (£650.00)
                        </div>
                      </div>
                    )}

                    {/* DIAGRAM 2: INSTANT SETTLEMENT SPLIT */}
                    {currentStep.diagramType === 'split' && (
                      <div className="space-y-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Settlement Gateway Engine</div>
                        <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center text-white font-bold">
                          Buyer Payment Received: £650.00
                        </div>

                        <div className="flex justify-center text-emerald-400">
                          <ArrowDown className="w-4 h-4 animate-bounce" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div className="p-2.5 bg-emerald-950/60 border-2 border-emerald-500/80 rounded-xl space-y-1 text-center">
                            <span className="text-emerald-400 font-bold block">85% OPS REVENUE</span>
                            <span className="text-white font-extrabold text-xs">£3.825</span>
                            <span className="text-[8px] text-slate-400 block">ActionReceipt Operations</span>
                          </div>

                          <div className="p-2.5 bg-amber-950/60 border-2 border-amber-500/80 rounded-xl space-y-1 text-center">
                            <span className="text-amber-400 font-bold block">15% SELLER REWARDS</span>
                            <span className="text-white font-extrabold text-xs">£0.675</span>
                            <span className="text-[8px] text-slate-400 block">Verified Seller Pool</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DIAGRAM 3: DIRECT TO OPS */}
                    {currentStep.diagramType === 'ops' && (
                      <div className="space-y-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-emerald-400 font-bold">ACTIONRECEIPT OPS LEDGER</span>
                          <span className="text-slate-500">LIVE /ops</span>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                          <div className="flex justify-between items-center text-white text-[11px]">
                            <span className="flex items-center space-x-1 font-bold">
                              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Gross Protection Fee (£500–£800 Tier)</span>
                            </span>
                            <span className="text-emerald-400 font-extrabold">£4.50</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] pl-2 border-l border-emerald-500/30">
                            <span className="text-emerald-300">85% Ops Revenue:</span>
                            <span className="text-emerald-300 font-bold">£3.825</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] pl-2 border-l border-amber-500/30">
                            <span className="text-amber-300">15% Seller Rewards:</span>
                            <span className="text-amber-300 font-bold">£0.675</span>
                          </div>
                        </div>

                        <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-[10px] text-center font-bold">
                          ✓ Guaranteed 85% Ops Revenue / 15% Seller Rewards Split
                        </div>
                      </div>
                    )}

                    {/* DIAGRAM 4: SELLER RECEIVES NET PAYOUT */}
                    {currentStep.diagramType === 'seller' && (
                      <div className="space-y-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Seller Payout Notification</div>
                        
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                          <div className="flex justify-between items-center text-white text-xs font-bold">
                            <span>TechWorld Store Bank Account</span>
                            <span className="text-emerald-400">+£645.50</span>
                          </div>
                          <div className="text-[9px] text-slate-400 font-sans">
                            Item: XPhone Pro 256GB (£650.00) | Status: Cleared Net Settlement
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-[10px] space-y-1">
                          <div className="flex justify-between">
                            <span>Item Price:</span>
                            <span className="text-white">£650.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Value Protection Fee (£500–£800 Tier):</span>
                            <span className="text-emerald-400">£4.50</span>
                          </div>
                          <div className="flex justify-between font-bold border-t border-slate-800 pt-1 text-white">
                            <span>Net Settlement:</span>
                            <span>£645.50</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DIAGRAM 5: SCALE ECONOMICS */}
                    {currentStep.diagramType === 'scale' && (
                      <div className="space-y-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-left">
                        <div className="text-[10px] text-emerald-400 font-bold uppercase">Ops Revenue Projections</div>
                        
                        <div className="space-y-1.5 text-[10px] font-mono">
                          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                            <span className="text-slate-400">10,000 Tx / Day:</span>
                            <span className="text-emerald-400 font-bold">£3,500 / Day</span>
                          </div>
                          <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                            <span className="text-slate-400">50,000 Tx / Day:</span>
                            <span className="text-emerald-400 font-bold">£17,500 / Day</span>
                          </div>
                          <div className="p-2 bg-emerald-500/20 border border-emerald-400/40 rounded-xl flex justify-between text-white font-extrabold">
                            <span>100,000 Tx / Day:</span>
                            <span className="text-emerald-300">£35,000 / Day</span>
                          </div>
                        </div>

                        <div className="text-[9px] text-slate-400 text-center font-sans">
                          98%+ gross margin on micro AI verification transactions
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>

                {/* MOCKUP FOOTER */}
                <div className="pt-3 border-t border-slate-900 text-center text-[9px] text-slate-500">
                  MarketSquare • Direct-to-Ops Monetization Engine
                </div>

              </div>
            </div>

          </div>

          {/* RECHARTS DATA VISUALIZATION SECTION */}
          <div className="mt-8 p-6 bg-slate-900/90 border border-slate-800 rounded-3xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Interactive Financial & Revenue Analytics</span>
                </div>
                <h3 className="text-xl font-extrabold text-white">Monetization & Scale Economics Breakdown</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-xs font-bold">
                85% Ops Revenue / 15% Seller Rewards
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CHART 1: INSTANT FEE SPLIT */}
              <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300 font-bold flex items-center space-x-2">
                    <PieIcon className="w-4 h-4 text-emerald-400" />
                    <span>Transaction Settlement Distribution (£650.00 Gross)</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Value Fee £4.50</span>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Net Seller Settlement', value: 645.50, color: '#10b981' },
                          { name: '85% Ops Revenue', value: 3.825, color: '#34d399' },
                          { name: '15% Seller Rewards', value: 0.675, color: '#f59e0b' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell key="cell-seller" fill="#10b981" />
                        <Cell key="cell-ops" fill="#34d399" />
                        <Cell key="cell-reward" fill="#f59e0b" />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                        formatter={(val: any) => [`£${Number(val).toFixed(2)}`, 'Amount']}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-between text-[11px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Seller Receives: <strong className="text-white">£645.50</strong></span>
                  <span className="text-emerald-400 font-bold">Ops Rev: £3.83 | Seller Reward: £0.68</span>
                </div>
              </div>

              {/* CHART 2: DAILY REVENUE AT SCALE */}
              <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300 font-bold flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Daily Ops Revenue Growth (85% Ops Split)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Scale Economics</span>
                </div>

                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { volume: '10k/day', daily: 3500, monthly: 105000 },
                        { volume: '50k/day', daily: 17500, monthly: 525000 },
                        { volume: '100k/day', daily: 35000, monthly: 1050000 },
                        { volume: '250k/day', daily: 87500, monthly: 2625000 }
                      ]}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <XAxis dataKey="volume" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} tickFormatter={(val) => `£${val/1000}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                        formatter={(val: any) => [`£${Number(val).toLocaleString()}`, 'Daily Ops Revenue']}
                      />
                      <Bar dataKey="daily" fill="#10b981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between text-[11px] font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                  <span>At 100k Tx/day: <strong className="text-emerald-400">£35,000 / Day</strong></span>
                  <span className="text-slate-400">Monthly: £1,050,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM SUMMARY CTA & LINK TO OPS DASHBOARD */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 font-mono text-xs">
            <div className="flex items-center space-x-2 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero buyer surcharge • Zero seller friction • 100% Automated</span>
            </div>

            <div className="flex items-center space-x-3">
              {navigate && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 cursor-pointer transition flex items-center space-x-2"
                >
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  <span>VIEW OPS LEDGER (/ops)</span>
                </button>
              )}

              {onOpenCreateTx && (
                <button
                  onClick={onOpenCreateTx}
                  className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold cursor-pointer transition flex items-center space-x-2 shadow-md shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>TEST LIVE PROTECTED TRANSACTION</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

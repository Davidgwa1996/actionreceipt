import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Shield, Smartphone, CreditCard, Truck, AlertTriangle } from 'lucide-react';

export const HeroTrustVisual: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'SELLER CONFIRMED',
      desc: 'Government ID + Liveness + Address + Payout Beneficiary Matched',
      icon: Shield,
      badge: 'TruthChain Identity'
    },
    {
      title: 'PRODUCT CONFIRMED',
      desc: 'Gemini LiveCheck Token + Unpredictable Physical Challenge + Serial Fingerprint',
      icon: Smartphone,
      badge: 'Gemini LiveCheck'
    },
    {
      title: 'PAYMENT CONFIRMED',
      desc: 'Instant Release Settlement + Automatic Fee Split + Direct-to-Ops Accounting',
      icon: CreditCard,
      badge: 'Protected Settlement'
    },
    {
      title: 'ORDER PLACED',
      desc: 'Deterministic Policy Approved + Pre-Payment Scope Complete + Merchant Fulfilment',
      icon: CheckCircle2,
      badge: 'Order Placed ✓'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl shadow-emerald-950/30 overflow-hidden font-mono text-left">
      {/* Background glow accent */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-300 tracking-wider uppercase">TRUTHCHAIN ACTIVE LIFECYCLE</span>
        </div>
        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          Ref: AR-2026-9081
        </span>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isPassed = idx <= activeStep;
          const isCurrent = idx === activeStep;

          return (
            <motion.div
              key={step.title}
              initial={false}
              animate={{
                scale: isCurrent ? 1.02 : 1,
                opacity: isPassed ? 1 : 0.4
              }}
              transition={{ duration: 0.3 }}
              className={`p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-slate-800/90 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : isPassed
                  ? 'bg-slate-900/60 border-slate-800'
                  : 'bg-slate-950/40 border-slate-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isPassed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-500 border border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-100 tracking-tight">{step.title}</span>
                      {isPassed && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5 leading-snug">{step.desc}</p>
                  </div>
                </div>

                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {step.badge}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px]">
        <div className="text-slate-400">
          Status: <span className="text-emerald-400 font-bold">READY_FOR_FUNDING</span>
        </div>
        <div className="text-slate-500 flex items-center space-x-1">
          <Shield className="w-3 h-3 text-emerald-400" />
          <span>No Blind Trust Required</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Cloud, ExternalLink, QrCode, Smartphone, Store, Code2, Globe, CheckCircle2, Lock } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900/80 text-slate-400 text-xs py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          
          {/* Column 1 & 2: Brand Identity & Mission Scope */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white font-mono tracking-tight block">ACTIONRECEIPT</span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider uppercase block font-semibold">AI Pre-Payment Trust Infrastructure</span>
              </div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed max-w-md">
              ActionReceipt binds seller identity, LocationProof, payout ownership, real-time product proof, and deterministic policy checks into a unified pre-payment verification record. Scope strictly completes at <strong className="text-emerald-400 font-mono">ORDER PLACED ✓</strong>.
            </p>

            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800/80 space-y-2 max-w-md font-mono text-[11px]">
              <div className="flex items-center justify-between text-slate-200">
                <span className="flex items-center space-x-2">
                  <Cloud className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Cloud Engine: Google Cloud Run</span>
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">100% OPERATIONAL</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[10px] pt-1 border-t border-slate-800/60">
                <span>Gemini 3.6 Flash Multi-Agent Engine</span>
                <span className="text-slate-500 font-bold">v3.6.0-PROD</span>
              </div>
            </div>
          </div>

          {/* Column 3: Platform & Core Product */}
          <div className="space-y-4">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-[11px] font-mono border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span>Core Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h4>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Home Overview</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/store')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group text-emerald-300 font-medium">
                  <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Verified Store Catalog</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/demo')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>3-Min Video Walkthrough</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/revenue-flow')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Revenue & Protection Flow</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/ops')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Ops Control Tower</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Seller Connections */}
          <div className="space-y-4">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-[11px] font-mono border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span>Seller Integrations</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h4>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li>
                <button onClick={() => navigate('/integrate')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>1. Social Storefront Bio Links</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/integrate')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>2. Marketplaces & Classifieds</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/integrate')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <QrCode className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>3. In-Store Business QR Code</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/integrate')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <Store className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>4. E-Commerce Store Button</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/developers')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>5. Enterprise REST API</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Security & Verification */}
          <div className="space-y-4">
            <h4 className="text-slate-100 font-bold uppercase tracking-wider text-[11px] font-mono border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span>Security & Tech</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </h4>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li>
                <button onClick={() => navigate('/developers')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <Code2 className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>API Docs & Webhooks</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/security')} className="hover:text-emerald-400 transition cursor-pointer flex items-center space-x-2 group">
                  <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>TruthChain Cryptography</span>
                </button>
              </li>
              <li>
                <a href="https://cloud.google.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition flex items-center space-x-2 group text-slate-400">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Google Cloud Infrastructure</span>
                </a>
              </li>
              <li>
                <a href="https://ai.google.dev" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition flex items-center space-x-2 group text-slate-400">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>Gemini 3.6 SDK Documentation</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Commercial & Protection Model Banner */}
        <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20 font-bold text-[10px]">
              VALUE-BASED PROTECTION
            </span>
            <span className="text-slate-200">
              Under £5 = <strong className="text-emerald-400">FREE</strong> | £5 – £800+ = <strong className="text-emerald-400">£0.30 – £4.50</strong> Tiers
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] shrink-0">
            <span className="text-emerald-400 font-bold">85% Ops Revenue</span>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400 font-bold">15% Seller Reward Split</span>
          </div>
        </div>

        {/* Sub-footer Copyright & Status */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-400 text-[11px] gap-4">
          <p className="text-slate-400 font-medium">© 2026 ACTIONRECEIPT Inc. All rights reserved. Built on Google Cloud & Gemini 3.6 Flash Engine.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-emerald-400/90 text-[10px] tracking-wider font-semibold">
            <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">SELLER VERIFIED ✓</span>
            <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LOCATION PROVED ✓</span>
            <span className="bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">ORDER PLACED ✓</span>
          </div>
        </div>

      </div>
    </footer>
  );
};



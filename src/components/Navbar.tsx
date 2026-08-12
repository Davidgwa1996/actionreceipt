import React, { useState } from 'react';
import { 
  ShieldCheck, Menu, X, Layers, Zap, Code2, Lock, Tag, Cpu, 
  UserCheck, Film, Play, Sparkles, ShoppingBag, Gamepad2, DollarSign, Store 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, navigate, onOpenCreateTx }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { label: 'HOME', route: '/', icon: ShieldCheck },
    { label: 'VERIFIED STORE CATALOG', route: '/store', icon: Store },
    { label: 'DEMO VIDEO', route: '/demo', icon: Film },
    { label: 'REVENUE & MONETIZATION FLOW', route: '/revenue-flow', icon: DollarSign },
    { label: 'PRODUCT SUMMARY', route: '/product', icon: Layers },
    { label: 'HOW IT WORKS & PRICING', route: '/how-it-works', icon: Zap },
    { label: 'INTEGRATION & DEVELOPERS', route: '/integrate', icon: Code2 },
    { label: 'SECURITY', route: '/security', icon: Lock },
    { label: 'OPS DASHBOARD', route: '/dashboard', icon: UserCheck },
  ];

  const handleNavigate = (route: string) => {
    setIsDrawerOpen(false);
    navigate(route);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* STRICT TOP-LEFT: Menu Button + Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              id="top-left-menu-btn"
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800 text-xs font-bold transition cursor-pointer active:scale-95"
            >
              <Menu className="w-4 h-4" />
              <span>MENU</span>
            </button>

            {/* Brand Logo */}
            <div 
              onClick={() => handleNavigate('/')}
              className="flex items-center space-x-2.5 cursor-pointer group"
              id="nav-brand-logo"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-lg tracking-tight text-white font-mono">ACTIONRECEIPT</span>
                  <span className="text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
                    AI PROOF-TO-PAYOUT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            <button
              id="nav-get-started-btn"
              onClick={onOpenCreateTx}
              className="flex items-center space-x-2 px-4 py-2 font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-md shadow-emerald-500/20 transition transform active:scale-95 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>GET STARTED</span>
            </button>
          </div>

        </div>
      </header>

      {/* LEFT-SIDE VERTICAL NAVIGATION DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Left Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 max-w-[85vw] bg-slate-950 border-r border-slate-800 h-full flex flex-col z-50 shadow-2xl font-mono text-xs overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-sm text-white tracking-tight">ACTIONRECEIPT</span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Vertical Menu Links */}
              <div className="p-3 space-y-1 flex-1 text-left">
                <div className="px-3 py-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Navigation Menu
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavigate(item.route)}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}

                {/* GET STARTED CTA in Drawer */}
                <div className="pt-3 border-t border-slate-900">
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      onOpenCreateTx();
                    }}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>GET STARTED</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-900 text-[10px] text-slate-500 text-left">
                <p className="font-bold text-slate-400">ActionReceipt Platform</p>
                <p>AI Remote Purchase Protection</p>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};

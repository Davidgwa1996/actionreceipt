import React, { useState } from 'react';
import { ShieldCheck, Share2, Sparkles, Smartphone, Layers, CheckCircle2, ArrowRight, ExternalLink, X, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UniversalOverlayWidgetProps {
  onOpenCreateTx: (initialData?: { title?: string; price?: string; seller?: string; url?: string }) => void;
  navigate: (route: string) => void;
}

export const UniversalOverlayWidget: React.FC<UniversalOverlayWidgetProps> = ({ onOpenCreateTx, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'EXTENSION' | 'SHARE' | 'INTEGRATED'>('EXTENSION');
  const [pasteUrl, setPasteUrl] = useState('');

  const handleSimulateExtract = () => {
    onOpenCreateTx({
      title: 'Sony PlayStation 5 Digital Edition',
      price: '380',
      seller: 'Marcus Vance',
      url: pasteUrl || 'https://classifieds.example/item/ps5-380'
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button at Bottom Right */}
      <div className="fixed bottom-5 right-5 z-40 font-mono">
        <button
          id="universal-overlay-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="group relative px-4 py-3 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-bold transition transform active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="hidden sm:inline text-white font-extrabold">BUY WITH ACTIONRECEIPT</span>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded border border-emerald-500/30">
            ANY LISTING
          </span>
        </button>
      </div>

      {/* Extension Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 text-left relative shadow-2xl font-mono text-xs overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Universal ActionReceipt Layer</h3>
                    <p className="text-[10px] text-slate-400 font-sans">Protect any remote purchase across any site or app</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-800 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Selection Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
                <button
                  onClick={() => setActiveMode('EXTENSION')}
                  className={`py-2 px-1 text-center font-bold rounded-lg transition ${
                    activeMode === 'EXTENSION' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  BROWSER EXTENSION
                </button>
                <button
                  onClick={() => setActiveMode('SHARE')}
                  className={`py-2 px-1 text-center font-bold rounded-lg transition ${
                    activeMode === 'SHARE' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  MOBILE SHARE
                </button>
                <button
                  onClick={() => setActiveMode('INTEGRATED')}
                  className={`py-2 px-1 text-center font-bold rounded-lg transition ${
                    activeMode === 'INTEGRATED' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  MERCHANT SDK
                </button>
              </div>

              {/* Mode Content */}
              {activeMode === 'EXTENSION' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">SELLER INTEGRATION STATUS:</span>
                      <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                        NOT INTEGRATED
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">ACTIONRECEIPT PROTECTION:</span>
                      <span className="text-emerald-400 font-bold">AVAILABLE AFTER VERIFICATION</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-400 text-[11px] block">Paste Listing or Marketplace URL:</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="e.g. https://social-market.example/item/iphone15pro"
                        value={pasteUrl}
                        onChange={(e) => setPasteUrl(e.target.value)}
                        className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-sans text-xs focus:border-emerald-500 focus:outline-none"
                      />
                      <button
                        onClick={handleSimulateExtract}
                        className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1 cursor-pointer whitespace-nowrap"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>PROTECT</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                    The extension overlay automatically parses commerce signals from un-integrated social channels, classifieds, and private store pages.
                  </p>
                </div>
              )}

              {activeMode === 'SHARE' && (
                <div className="space-y-4 text-xs font-sans">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center space-x-3 text-emerald-400 font-mono font-bold text-xs">
                      <Smartphone className="w-5 h-5" />
                      <span>SHARE TO ACTIONRECEIPT IN 2 TAPS</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Viewing a listing in a closed mobile app (Instagram, Facebook Marketplace, TikTok Shop)? Tap <strong>SHARE</strong> → Choose <strong>ACTIONRECEIPT</strong> to trigger buyer-initiated protection.
                    </p>
                  </div>

                  <button
                    onClick={handleSimulateExtract}
                    className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>SIMULATE MOBILE SHARE LISTING</span>
                  </button>
                </div>
              )}

              {activeMode === 'INTEGRATED' && (
                <div className="space-y-4 font-sans text-xs">
                  <div className="p-4 bg-emerald-950/30 rounded-2xl border border-emerald-500/30 space-y-2 font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">SELLER STATUS:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        ACTIONRECEIPT VERIFIED SELLER ✓
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs font-sans pt-1">
                      Integrated merchant checkouts run ActionReceipt natively. Protection fees are value-based (FREE &lt; £5, £0.30–£1.20 tiers) and earn 15% Seller Rewards for verified merchants.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/integrate');
                    }}
                    className="w-full py-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400 font-mono font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>EXPLORE MERCHANT API & SDK DOCS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Bottom Notice */}
              <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
                UNIVERSAL ACCESS LAYER | VALUE-BASED ORDER PROTECTION & SELLER REWARDS
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

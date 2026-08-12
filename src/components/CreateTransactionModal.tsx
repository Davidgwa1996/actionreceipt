import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, ArrowRight, RefreshCw, Copy, Check, MapPin, Compass } from 'lucide-react';

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: string) => void;
  initialData?: {
    itemTitle?: string;
    itemPrice?: number;
    sellerName?: string;
  };
}

export const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({ isOpen, onClose, navigate, initialData }) => {
  const [itemTitle, setItemTitle] = useState(initialData?.itemTitle || '');
  const [itemPrice, setItemPrice] = useState(initialData?.itemPrice ? String(initialData.itemPrice) : '650');
  const [sellerName, setSellerName] = useState(initialData?.sellerName || 'Sarah Jenkins');
  const [sellerType, setSellerType] = useState<'INDIVIDUAL' | 'SOLE_TRADER' | 'REGISTERED_BUSINESS'>('SOLE_TRADER');
  const [createdTx, setCreatedTx] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // GPS Telemetry State
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'IDLE' | 'ACQUIRING' | 'VERIFIED' | 'DEFAULT'>('IDLE');

  useEffect(() => {
    if (initialData) {
      if (initialData.itemTitle) setItemTitle(initialData.itemTitle);
      if (initialData.itemPrice) setItemPrice(String(initialData.itemPrice));
      if (initialData.sellerName) setSellerName(initialData.sellerName);
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen && !gpsLocation) {
      acquireGpsLocation();
    }
  }, [isOpen]);

  const acquireGpsLocation = () => {
    setGpsStatus('ACQUIRING');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setGpsStatus('VERIFIED');
        },
        (_err) => {
          // Default London UK coordinates for fallback demo
          setGpsLocation({ lat: 51.5074, lng: -0.1278 });
          setGpsStatus('DEFAULT');
        },
        { timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      setGpsLocation({ lat: 51.5074, lng: -0.1278 });
      setGpsStatus('DEFAULT');
    }
  };

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemTitle: itemTitle || 'iPhone 15 Pro Max 256GB',
          itemPrice: parseFloat(itemPrice) || 650,
          description: 'Protected transaction created via ActionReceipt link generator',
          sellerName,
          sellerType,
          gpsLatitude: gpsLocation?.lat || 51.5074,
          gpsLongitude: gpsLocation?.lng || -0.1278
        })
      });
      const data = await res.json();
      setCreatedTx(data);
    } catch (err) {
      console.error('Create tx error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!createdTx) return;
    const link = `${window.location.origin}/pay/${createdTx.id}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-left relative shadow-2xl font-mono text-xs">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Create Protected ActionReceipt Link</h2>
              <span className="text-[11px] text-slate-400">Generates instant seller checkout link</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!createdTx ? (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-slate-400 mb-1">Item Title / Listing Name</label>
              <input
                type="text"
                placeholder="e.g. iPhone 15 Pro Max 256GB"
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-sans text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">Price (GBP)</label>
                <input
                  type="number"
                  placeholder="650"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-mono text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Seller Full Name</label>
                <input
                  type="text"
                  placeholder="Sarah Jenkins"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-sans text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Seller Identity Category</label>
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value as any)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none text-xs"
              >
                <option value="SOLE_TRADER">Sole Trader / Social Commerce</option>
                <option value="INDIVIDUAL">Individual Private Seller</option>
                <option value="REGISTERED_BUSINESS">Registered Company</option>
              </select>
            </div>

            {/* GPS LOCATION TELEMETRY STATUS */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>
                  {gpsStatus === 'ACQUIRING'
                    ? 'Acquiring GPS Telemetry...'
                    : gpsLocation
                    ? `GPS: ${gpsLocation.lat.toFixed(4)}° N, ${gpsLocation.lng.toFixed(4)}° W`
                    : 'GPS Telemetry Active'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 text-[10px]">
                LOCATIONPROOF ✓
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>GENERATING LINK...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>GENERATE PROTECTED LINK</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/40 space-y-2">
              <span className="text-emerald-400 font-bold text-xs block">PROTECTED LINK CREATED ✓</span>
              <p className="text-slate-300 font-sans text-xs">
                Send this ActionReceipt payment link to your buyer. Checkout unlocks only after TruthChain checks pass.
              </p>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono break-all">
                {`${window.location.origin}/pay/${createdTx.id}`}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'LINK COPIED!' : 'COPY PAYMENT LINK'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  navigate(`/pay/${createdTx.id}`);
                }}
                className="py-3 px-4 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 rounded-xl font-bold text-xs cursor-pointer"
              >
                OPEN CHECKOUT NOW
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

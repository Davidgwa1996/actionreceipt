import React, { useState } from 'react';
import { MapPin, ShieldCheck, Globe, Navigation, Lock, CheckCircle2, Wifi, EyeOff, AlertCircle } from 'lucide-react';

export interface LocationProofProps {
  country?: string;
  region?: string;
  city?: string;
  status?: 'VERIFIED' | 'PENDING' | 'REJECTED';
  gpsAccuracyMeters?: number;
  ipNetworkMatched?: boolean;
  registeredAddressMatched?: boolean;
  isPrivacyMode?: boolean;
  verifiedAt?: string;
  className?: string;
  compact?: boolean;
}

export const LocationProof: React.FC<LocationProofProps> = ({
  country = 'United Kingdom',
  region = 'Greater Manchester',
  city = 'Manchester City',
  status = 'VERIFIED',
  gpsAccuracyMeters = 12,
  ipNetworkMatched = true,
  registeredAddressMatched = true,
  isPrivacyMode = true,
  verifiedAt = 'Real-Time Sync',
  className = '',
  compact = false
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const isVerified = status === 'VERIFIED';

  if (compact) {
    return (
      <div id="location-proof-compact-badge" className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono ${className}`}>
        <MapPin className={`w-3.5 h-3.5 ${isVerified ? 'text-emerald-400' : 'text-amber-400'}`} />
        <span className="text-slate-300 font-bold">{city}, {country}</span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isVerified ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400'}`}>
          {isVerified ? 'LOCATION VERIFIED ✓' : 'PENDING'}
        </span>
      </div>
    );
  }

  return (
    <div id="location-proof-card" className={`p-5 bg-slate-900/90 rounded-2xl border ${isVerified ? 'border-emerald-500/30' : 'border-amber-500/30'} space-y-4 font-mono text-xs shadow-xl text-left ${className}`}>
      
      {/* Location Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <MapPin className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white text-sm">ACTIONRECEIPT LOCATIONPROOF</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                EVIDENCE SIGNAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans mt-0.5">
              Geographic verification reconciling device GPS, network IP, and registered location.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isVerified ? (
            <span className="bg-emerald-500/10 text-emerald-400 font-extrabold px-3 py-1 rounded-xl border border-emerald-500/30 text-[11px] flex items-center space-x-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>LOCATION VERIFIED ✓</span>
            </span>
          ) : (
            <span className="bg-amber-500/10 text-amber-400 font-bold px-3 py-1 rounded-xl border border-amber-500/30 text-[11px]">
              LOCATION PENDING
            </span>
          )}
        </div>
      </div>

      {/* Main Geographic Location Banner */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block">VERIFIED GEOGRAPHIC REGION</span>
          <div className="flex items-center space-x-2 text-white font-extrabold text-sm sm:text-base">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>{city}, {region}, {country}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-sans block">
            Location hash timestamped at checkout initialization ({verifiedAt}).
          </span>
        </div>

        <div className="sm:text-right font-mono">
          <span className="text-[10px] text-slate-500 uppercase block">GPS ACCURACY</span>
          <span className="text-emerald-400 font-bold text-xs">Within {gpsAccuracyMeters}m Radius ✓</span>
        </div>
      </div>

      {/* Reconciled Signals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
        
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span className="flex items-center space-x-1.5">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>Device GPS</span>
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-sans">Active coordinates matched to listing origin.</p>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span className="flex items-center space-x-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>IP / Network</span>
            </span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-sans">{ipNetworkMatched ? 'Residential/Business ISP Matched' : 'Unverified Proxy'}</p>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-300 font-bold">
            <span className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-teal-400" />
              <span>Privacy Status</span>
            </span>
            <EyeOff className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <p className="text-[10px] text-slate-400 font-sans">{isPrivacyMode ? 'Private Home Address Redacted' : 'Public Store Address'}</p>
        </div>

      </div>

      {/* Details Expander Toggle */}
      <div className="pt-1 flex items-center justify-between text-[11px] border-t border-slate-800">
        <span className="text-slate-400 font-sans">
          LocationProof integrates with TruthChain to prevent cross-border or fake location scams.
        </span>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-emerald-400 hover:underline font-bold cursor-pointer transition ml-2 whitespace-nowrap"
        >
          {showDetails ? 'Hide Verification Audit ▲' : 'View Location Audit ▼'}
        </button>
      </div>

      {showDetails && (
        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-2 text-slate-300 font-mono">
          <div className="flex justify-between">
            <span className="text-slate-500">Geolocation Country Code:</span>
            <span className="text-emerald-400 font-bold">GB (United Kingdom)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Regional Authority:</span>
            <span>Greater Manchester Combined Authority</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Geo-Fence Radius:</span>
            <span>0.015km Verified Safe Zone</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Residential Address Protection:</span>
            <span className="text-teal-300">Active (Full Street Address Withheld for Privacy)</span>
          </div>
        </div>
      )}

    </div>
  );
};

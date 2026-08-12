import React from 'react';
import { Lock, ShieldCheck, Server, Key, EyeOff, FileText, MapPin } from 'lucide-react';
import { LocationProof } from './LocationProof';

export const SecurityPage: React.FC = () => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 text-left">
        
        {/* Header */}
        <div className="space-y-4 border-b border-slate-900 pb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs border border-emerald-500/20">
            <Lock className="w-4 h-4" />
            <span>TruthChain Security Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Security, Privacy & TruthChain Controls
          </h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            ActionReceipt combines zero-trust server state machines with privacy-preserving identity checks, encrypted storage, and secret key isolation.
          </p>
        </div>

        {/* Live Security LocationProof Signal */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold font-mono text-emerald-400 flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Active Geographic Verification Signal (LocationProof)</span>
          </h2>
          <LocationProof
            country="United Kingdom"
            region="Greater Manchester"
            city="Manchester City"
            status="VERIFIED"
            gpsAccuracyMeters={10}
            ipNetworkMatched={true}
            registeredAddressMatched={true}
            isPrivacyMode={true}
          />
        </div>

        {/* Security Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-base">
              <EyeOff className="w-5 h-5" />
              <span>Residential Address Minimization</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Sellers undergo thorough proof of address, but residential addresses are never exposed to remote buyers. Buyers see only <code className="text-emerald-400 font-mono">ADDRESS CHECK CONFIRMED ✓</code>.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-teal-400 font-bold text-base">
              <Server className="w-5 h-5" />
              <span>Server-Only Secret Key Isolation</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Gemini API keys, Stripe identity credentials, and webhook signing secrets remain strictly server-side inside Google Secret Manager.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-purple-400 font-bold text-base">
              <Key className="w-5 h-5" />
              <span>No-Bypass State Machine</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Crucial states such as <code className="text-purple-400 font-mono">READY_FOR_FUNDING</code> cannot be reached by URL manipulation or client jumps. Server rules validate every prerequisite.
            </p>
          </div>

          <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-base">
              <FileText className="w-5 h-5" />
              <span>Signed Webhooks & Audit Trails</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Every state change, Gemini execution, and financial release creates a cryptographic audit trail logged in Cloud Logging and BigQuery.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

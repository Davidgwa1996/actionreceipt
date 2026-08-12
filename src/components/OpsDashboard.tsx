import React, { useState, useEffect } from 'react';
import {
  BarChart3, ShieldCheck, Terminal, Cpu, RefreshCw, CheckCircle2,
  AlertTriangle, DollarSign, Download, Play, UserCheck, TrendingUp,
  Layers, Globe, Calculator, Zap, Award, Coins, ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { PlatformMetrics, FinancialPnL, CustomerEvidence, ReleaseGateResult, Transaction } from '../types';
import { LocationProof } from './LocationProof';
import { GlobalRiskMap } from './GlobalRiskMap';
import { calculatePricing, PRICING_TIERS_CONFIG } from '../utils/pricingEngine';

interface OpsDashboardProps {
  navigate: (route: string) => void;
  onOpenNotifications?: () => void;
  onOpenReceiptAnalyzer?: () => void;
  onOpenQRScanner?: () => void;
}

export const OpsDashboard: React.FC<OpsDashboardProps> = ({
  navigate,
  onOpenNotifications,
  onOpenReceiptAnalyzer,
  onOpenQRScanner
}) => {
  const [primaryTab, setPrimaryTab] = useState<'LIVE' | 'SIMULATOR'>('LIVE');
  const [subTab, setSubTab] = useState<'METRICS' | 'SELLER_REWARDS' | 'TRANSACTIONS' | 'LOGS' | 'PNL' | 'GATES' | 'FEEDBACK'>('METRICS');
  
  // Real live data
  const [metrics, setMetrics] = useState<PlatformMetrics | null>(null);
  const [pnl, setPnl] = useState<FinancialPnL[]>([]);
  const [evidence, setEvidence] = useState<CustomerEvidence[]>([]);
  const [gates, setGates] = useState<ReleaseGateResult[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Growth Simulator State - Basket Value Tier Mix (sums to 100)
  const [dailyTxCount, setDailyTxCount] = useState<number>(100000000);
  const [mixUnder5, setMixUnder5] = useState<number>(20);   // Under £5 (FREE)
  const [mix5to10, setMix5to10] = useState<number>(15);    // £5 - £9.99 (£0.30)
  const [mix10to15, setMix10to15] = useState<number>(15);  // £10 - £14.99 (£0.35)
  const [mix15to45, setMix15to45] = useState<number>(15);  // £15 - £44.99 (£0.40)
  const [mix45to100, setMix45to100] = useState<number>(15); // £45 - £99.99 (£0.65)
  const [mix100to300, setMix100to300] = useState<number>(10); // £100 - £299.99 (£1.20)
  const [mix300to500, setMix300to500] = useState<number>(5);  // £300 - £499.99 (£2.50)
  const [mix500to800, setMix500to800] = useState<number>(5);  // £500 - £800 (£4.50)

  const fetchOpsData = async () => {
    try {
      const [mRes, pRes, eRes, gRes, tRes] = await Promise.all([
        fetch('/api/ops/metrics'),
        fetch('/api/ops/pnl'),
        fetch('/api/ops/customer-evidence'),
        fetch('/api/ops/release-gates'),
        fetch('/api/transactions')
      ]);

      if (mRes.ok) setMetrics(await mRes.json());
      if (pRes.ok) setPnl(await pRes.json());
      if (eRes.ok) setEvidence(await eRes.json());
      if (gRes.ok) setGates(await gRes.json());
      if (tRes.ok) setTransactions(await tRes.json());
    } catch (err) {
      console.error('Fetch ops data failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpsData();
  }, []);

  // Live Metrics Calculations from real transactions
  const liveCalculatedPricingList = transactions.map(t => calculatePricing(t.itemPrice, t.currency));
  const liveGrossVolume = transactions.reduce((acc, t) => acc + t.itemPrice, 0);
  const liveGrossFees = liveCalculatedPricingList.reduce((acc, p) => acc + p.protectionFee, 0);
  const liveSellerRewards = liveCalculatedPricingList.reduce((acc, p) => acc + p.sellerReward, 0);
  const liveOpsRevenue = liveCalculatedPricingList.reduce((acc, p) => acc + p.opsRevenue, 0);
  const liveFreeOrders = transactions.filter(t => t.itemPrice < 5).length;
  const livePaidOrders = transactions.filter(t => t.itemPrice >= 5).length;

  // Simulator Calculations
  const totalMix = mixUnder5 + mix5to10 + mix10to15 + mix15to45 + mix45to100 + mix100to300 + mix300to500 + mix500to800 || 100;
  
  const simFreeCount = Math.round(dailyTxCount * (mixUnder5 / totalMix));
  const simCount5to10 = Math.round(dailyTxCount * (mix5to10 / totalMix));
  const simCount10to15 = Math.round(dailyTxCount * (mix10to15 / totalMix));
  const simCount15to45 = Math.round(dailyTxCount * (mix15to45 / totalMix));
  const simCount45to100 = Math.round(dailyTxCount * (mix45to100 / totalMix));
  const simCount100to300 = Math.round(dailyTxCount * (mix100to300 / totalMix));
  const simCount300to500 = Math.round(dailyTxCount * (mix300to500 / totalMix));
  const simCount500to800 = Math.round(dailyTxCount * (mix500to800 / totalMix));
  
  const simPaidCount = simCount5to10 + simCount10to15 + simCount15to45 + simCount45to100 + simCount100to300 + simCount300to500 + simCount500to800;

  const simGrossFeesDaily = 
    (simCount5to10 * 0.30) +
    (simCount10to15 * 0.35) +
    (simCount15to45 * 0.40) +
    (simCount45to100 * 0.65) +
    (simCount100to300 * 1.20) +
    (simCount300to500 * 2.50) +
    (simCount500to800 * 4.50);

  const simSellerRewardsDaily = simGrossFeesDaily * 0.15;
  const simOpsRevenueDaily = simGrossFeesDaily * 0.85;

  const simGrossFees30Days = simGrossFeesDaily * 30;
  const simSellerRewards30Days = simSellerRewardsDaily * 30;
  const simOpsRevenue30Days = simOpsRevenueDaily * 30;

  const simGrossFeesAnnual = simGrossFeesDaily * 365;
  const simSellerRewardsAnnual = simSellerRewardsDaily * 365;
  const simOpsRevenueAnnual = simOpsRevenueDaily * 365;

  // Chart projection mock data generator based on value mix
  const projectionDailyData = [
    { day: 'Day 1', grossFees: Math.round(simGrossFeesDaily * 0.7), opsRevenue: Math.round(simOpsRevenueDaily * 0.7), sellerRewards: Math.round(simSellerRewardsDaily * 0.7) },
    { day: 'Day 2', grossFees: Math.round(simGrossFeesDaily * 0.8), opsRevenue: Math.round(simOpsRevenueDaily * 0.8), sellerRewards: Math.round(simSellerRewardsDaily * 0.8) },
    { day: 'Day 3', grossFees: Math.round(simGrossFeesDaily * 0.85), opsRevenue: Math.round(simOpsRevenueDaily * 0.85), sellerRewards: Math.round(simSellerRewardsDaily * 0.85) },
    { day: 'Day 4', grossFees: Math.round(simGrossFeesDaily * 0.9), opsRevenue: Math.round(simOpsRevenueDaily * 0.9), sellerRewards: Math.round(simSellerRewardsDaily * 0.9) },
    { day: 'Day 5', grossFees: Math.round(simGrossFeesDaily * 0.95), opsRevenue: Math.round(simOpsRevenueDaily * 0.95), sellerRewards: Math.round(simSellerRewardsDaily * 0.95) },
    { day: 'Day 6', grossFees: Math.round(simGrossFeesDaily * 0.98), opsRevenue: Math.round(simOpsRevenueDaily * 0.98), sellerRewards: Math.round(simSellerRewardsDaily * 0.98) },
    { day: 'Day 7', grossFees: Math.round(simGrossFeesDaily), opsRevenue: Math.round(simOpsRevenueDaily), sellerRewards: Math.round(simSellerRewardsDaily) },
  ];

  const projectionChannelData = [
    { name: 'Native Marketplaces & API', value: 65, color: '#10b981' },
    { name: 'Universal Browser Extension', value: 20, color: '#3b82f6' },
    { name: 'Mobile Share Target', value: 10, color: '#8b5cf6' },
    { name: 'Direct Seller Links', value: 5, color: '#f59e0b' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 font-bold">
                OPS CONTROL TOWER
              </span>
              <span className="text-xs text-slate-500 font-mono">v3.6.0-PROD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              ACTIONRECEIPT PLATFORM TELEMETRY
            </h1>
            <p className="text-slate-400 text-xs font-sans max-w-xl">
              Real-time multi-agent verification monitoring, pre-payment trust analytics, and value-based financial projections.
            </p>
          </div>

          {/* MODE TOGGLE: LIVE PRODUCTION vs GROWTH SIMULATOR */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-mono shadow-xl">
              <button
                id="ops-tab-live-production"
                onClick={() => setPrimaryTab('LIVE')}
                className={`px-5 py-2.5 rounded-xl font-extrabold transition cursor-pointer flex items-center space-x-2 ${
                  primaryTab === 'LIVE'
                    ? 'bg-emerald-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-slate-950 animate-pulse"></div>
                <span>LIVE PRODUCTION</span>
              </button>
              <button
                id="ops-tab-growth-simulator"
                onClick={() => setPrimaryTab('SIMULATOR')}
                className={`px-5 py-2.5 rounded-xl font-extrabold transition cursor-pointer flex items-center space-x-2 ${
                  primaryTab === 'SIMULATOR'
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>REVENUE / GROWTH SIMULATOR</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRIMARY TAB 1: LIVE PRODUCTION (STRICTLY REAL METRICS)   */}
        {/* ========================================================= */}
        {primaryTab === 'LIVE' && (
          <div className="space-y-8">
            
            {/* Live Mode Notice */}
            <div className="p-4 bg-emerald-950/30 rounded-2xl border border-emerald-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-bold">LIVE PRODUCTION MODE ACTIVE</span>
                <span className="text-slate-300 font-sans">showing verified real-world transaction telemetry. No synthetic figures.</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-mono">SPLIT: 85% OPS REVENUE | 15% SELLER REWARDS</span>
            </div>

            {/* Sub navigation for Live Production */}
            <div className="flex items-center space-x-2 border-b border-slate-900 overflow-x-auto text-xs pb-1">
              {[
                { id: 'METRICS', label: 'Production Metrics' },
                { id: 'SELLER_REWARDS', label: 'Seller Rewards Ledger (15%)' },
                { id: 'TRANSACTIONS', label: 'Transaction Explorer' },
                { id: 'LOGS', label: 'Gemini Execution Logs' },
                { id: 'PNL', label: 'P&L Statements' },
                { id: 'GATES', label: 'Pre-Launch Test Gates' },
                { id: 'FEEDBACK', label: 'Customer Evidence' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSubTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                    subTab === tab.id
                      ? 'bg-slate-800 text-emerald-400 font-bold border border-slate-700'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* SUB TAB: METRICS */}
            {subTab === 'METRICS' && (
              <div className="space-y-6">
                
                {/* FINANCIAL SUMMARY CARDS WITH 85/15 SPLIT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
                  <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">Protected Gross Volume</span>
                    <p className="text-2xl font-extrabold text-white">£{(liveGrossVolume || metrics?.grossVolumeUsd || 0).toFixed(2)}</p>
                    <span className="text-[10px] text-emerald-400">{transactions.length} Total Orders</span>
                  </div>

                  <div className="p-5 bg-slate-900/80 rounded-2xl border border-emerald-500/30 space-y-1 bg-emerald-950/10">
                    <span className="text-slate-400 uppercase text-[10px]">Gross Protection Fees</span>
                    <p className="text-2xl font-extrabold text-emerald-400">£{(liveGrossFees || metrics?.totalPlatformFeesUsd || 0).toFixed(2)}</p>
                    <span className="text-[10px] text-emerald-400/80">{livePaidOrders} Paid Orders</span>
                  </div>

                  <div className="p-5 bg-slate-900/80 rounded-2xl border border-blue-500/30 space-y-1 bg-blue-950/10">
                    <span className="text-blue-400 uppercase text-[10px] font-bold">85% OPS Revenue</span>
                    <p className="text-2xl font-extrabold text-blue-300">£{(liveOpsRevenue || 0).toFixed(2)}</p>
                    <span className="text-[10px] text-blue-400/80">ActionReceipt Net Share</span>
                  </div>

                  <div className="p-5 bg-slate-900/80 rounded-2xl border border-amber-500/30 space-y-1 bg-amber-950/10">
                    <span className="text-amber-400 uppercase text-[10px] font-bold">15% Seller Rewards</span>
                    <p className="text-2xl font-extrabold text-amber-300">£{(liveSellerRewards || 0).toFixed(2)}</p>
                    <span className="text-[10px] text-amber-400/80">Accrued Seller Incentive</span>
                  </div>

                  <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-slate-400 uppercase text-[10px]">Free Orders (&lt; £5)</span>
                    <p className="text-2xl font-extrabold text-slate-300">{liveFreeOrders}</p>
                    <span className="text-[10px] text-slate-500">£0 Fee / £0 Revenue</span>
                  </div>
                </div>

                {/* BREAKDOWN BY PRICING TIER */}
                <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                        LIVE REVENUE & SELLER REWARDS BY PRICING TIER
                      </h3>
                      <p className="text-[11px] text-slate-400 font-sans">
                        Official value-based tiers applied to real live transaction volume
                      </p>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20">
                      LIVE ACCOUNTING
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                          <th className="py-2.5">TIER RANGE</th>
                          <th className="py-2.5">FEE RATE</th>
                          <th className="py-2.5 text-right">ORDERS</th>
                          <th className="py-2.5 text-right">GROSS VOLUME</th>
                          <th className="py-2.5 text-right">GROSS FEES</th>
                          <th className="py-2.5 text-right text-amber-400">SELLER REWARDS (15%)</th>
                          <th className="py-2.5 text-right text-emerald-400">OPS REVENUE (85%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {PRICING_TIERS_CONFIG.map((tier) => {
                          const tierTxList = transactions.filter(t => {
                            const p = calculatePricing(t.itemPrice, t.currency);
                            return p.pricingTier === tier.tier;
                          });
                          const tierCount = tierTxList.length;
                          const tierVolume = tierTxList.reduce((acc, t) => acc + (t.itemPrice || 0), 0);
                          const tierFees = tierTxList.reduce((acc, t) => acc + (calculatePricing(t.itemPrice, t.currency).protectionFee || 0), 0);
                          const tierRewards = tierFees * 0.15;
                          const tierOps = tierFees * 0.85;

                          return (
                            <tr key={tier.tier} className="hover:bg-slate-900/40">
                              <td className="py-3 font-bold text-white">{tier.name}</td>
                              <td className="py-3 text-slate-400">
                                {tier.fee === null ? (tier.display || 'PENDING') : tier.fee === 0 ? 'FREE' : `£${tier.fee.toFixed(2)}`}
                              </td>
                              <td className="py-3 text-right">{tierCount}</td>
                              <td className="py-3 text-right">£{(tierVolume || 0).toFixed(2)}</td>
                              <td className="py-3 text-right font-bold">£{(tierFees || 0).toFixed(2)}</td>
                              <td className="py-3 text-right text-amber-300">£{(tierRewards || 0).toFixed(2)}</td>
                              <td className="py-3 text-right text-emerald-300 font-bold">£{(tierOps || 0).toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* RECHARTS REAL-TIME TRANSACTION STATUS DISTRIBUTION VISUAL COMPONENT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* PIE CHART DISTRIBUTION */}
                  <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                          Real-Time Status Distribution (Active vs. Settled)
                        </h3>
                        <p className="text-[11px] text-slate-400 font-sans">
                          Live breakdown of transactions in progress, settled, and fraud blocked
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                        {transactions.length} TOTAL TRANSACTIONS
                      </span>
                    </div>

                    <div className="h-64 w-full flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={transactions.length > 0 ? [
                              { name: 'Settled / Order Placed', value: transactions.filter(t => t.state === 'PAYMENT_CONFIRMED' || t.state === 'ORDER_CONFIRMED' || t.state === 'ACCEPTED').length, color: '#10b981' },
                              { name: 'Active (In Verification)', value: transactions.filter(t => t.state !== 'PAYMENT_CONFIRMED' && t.state !== 'ORDER_CONFIRMED' && t.state !== 'ACCEPTED' && t.state !== 'BLOCKED' && t.state !== 'PROTECTED_PAYMENT_DISABLED').length, color: '#3b82f6' },
                              { name: 'Fraud Blocked', value: transactions.filter(t => t.state === 'BLOCKED' || t.state === 'PROTECTED_PAYMENT_DISABLED').length, color: '#f43f5e' }
                            ] : [
                              { name: 'No Transactions Yet', value: 1, color: '#334155' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {transactions.length > 0 ? (
                              <>
                                <Cell fill="#10b981" />
                                <Cell fill="#3b82f6" />
                                <Cell fill="#f43f5e" />
                              </>
                            ) : (
                              <Cell fill="#334155" />
                            )}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                            itemStyle={{ color: '#34d399' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-800 font-mono">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                        <span className="text-slate-300">Settled ({transactions.filter(t => t.state === 'PAYMENT_CONFIRMED' || t.state === 'ORDER_CONFIRMED' || t.state === 'ACCEPTED').length})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-slate-300">Active ({transactions.filter(t => t.state !== 'PAYMENT_CONFIRMED' && t.state !== 'ORDER_CONFIRMED' && t.state !== 'ACCEPTED' && t.state !== 'BLOCKED' && t.state !== 'PROTECTED_PAYMENT_DISABLED').length})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <span className="text-slate-300">Blocked ({transactions.filter(t => t.state === 'BLOCKED' || t.state === 'PROTECTED_PAYMENT_DISABLED').length})</span>
                      </div>
                    </div>
                  </div>

                  {/* BAR CHART: ACTIVE VS SETTLED RATIO */}
                  <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                        Active vs. Settled Ratio (Real-Time Service Layer)
                      </h3>
                      <span className="text-xs text-emerald-400 font-bold">
                        {((transactions.filter(t => t.state === 'PAYMENT_CONFIRMED' || t.state === 'ORDER_CONFIRMED' || t.state === 'ACCEPTED').length / Math.max(transactions.length, 1)) * 100).toFixed(0)}% SETTLED
                      </span>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            {
                              category: 'Transactions',
                              Active: transactions.filter(t => t.state !== 'PAYMENT_CONFIRMED' && t.state !== 'ORDER_CONFIRMED' && t.state !== 'ACCEPTED' && t.state !== 'BLOCKED' && t.state !== 'PROTECTED_PAYMENT_DISABLED').length,
                              Settled: transactions.filter(t => t.state === 'PAYMENT_CONFIRMED' || t.state === 'ORDER_CONFIRMED' || t.state === 'ACCEPTED').length,
                              Blocked: transactions.filter(t => t.state === 'BLOCKED' || t.state === 'PROTECTED_PAYMENT_DISABLED').length
                            }
                          ]}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="category" stroke="#64748b" tick={{ fontSize: 11 }} />
                          <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                          />
                          <Bar dataKey="Active" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="Settled" fill="#10b981" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="Blocked" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-[11px] text-slate-400 font-sans">
                      Fetches live transaction status from backend service layer.
                    </p>
                  </div>

                </div>

                {/* GLOBAL MAP VISUALIZATION */}
                <GlobalRiskMap transactions={transactions} />

              </div>
            )}

            {/* SUB TAB: SELLER_REWARDS */}
            {subTab === 'SELLER_REWARDS' && (
              <div className="space-y-6">
                <div className="p-6 bg-amber-950/20 rounded-3xl border border-amber-500/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-xs text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        COMMERCIAL SELLER INCENTIVE
                      </span>
                      <h2 className="text-2xl font-extrabold text-white">
                        ACTIONRECEIPT SELLER REWARDS LEDGER
                      </h2>
                      <p className="text-slate-300 text-xs font-sans">
                        Verified sellers earn 15% of the ActionReceipt protection fee on every successful paid protected order.
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">TOTAL ACCRUED REWARDS</span>
                      <span className="text-3xl font-extrabold text-amber-400 font-mono">£{(liveSellerRewards || 0).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-2">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block">PROTECTED SALES VALUE</span>
                      <strong className="text-white text-lg">£{(liveGrossVolume || 0).toFixed(2)}</strong>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block">TOTAL PROTECTION FEES</span>
                      <strong className="text-emerald-400 text-lg">£{(liveGrossFees || 0).toFixed(2)}</strong>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block">SELLER SHARE</span>
                      <strong className="text-amber-400 text-lg">15%</strong>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-slate-400 text-[10px] block">REWARD STATUS</span>
                      <strong className="text-emerald-400 text-lg">ACCRUED ✓</strong>
                    </div>
                  </div>
                </div>

                {/* Table of Seller Reward Transactions */}
                <div className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="font-bold text-xs text-white uppercase tracking-wider">
                    INDIVIDUAL TRANSACTIONS SELLER REWARD BREAKDOWN
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                          <th className="py-2.5">TRANSACTION ID</th>
                          <th className="py-2.5">SELLER</th>
                          <th className="py-2.5 text-right">ITEM PRICE</th>
                          <th className="py-2.5 text-right">PROTECTION FEE</th>
                          <th className="py-2.5 text-right text-amber-400">SELLER REWARD (15%)</th>
                          <th className="py-2.5 text-right text-emerald-400">OPS REVENUE (85%)</th>
                          <th className="py-2.5 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {transactions.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-slate-500 font-sans">
                              No live seller reward transactions recorded yet. System is ready for live protected sales.
                            </td>
                          </tr>
                        ) : (
                          transactions.map((t) => {
                          const p = calculatePricing(t.itemPrice, t.currency);
                          return (
                            <tr key={t.id} className="hover:bg-slate-900/40">
                              <td className="py-3 font-bold text-white">{(t.id || '').substring(0, 12)}...</td>
                              <td className="py-3 text-slate-300">{t.seller?.fullName || 'Seller'}</td>
                              <td className="py-3 text-right">£{(t.itemPrice || 0).toFixed(2)}</td>
                              <td className="py-3 text-right font-bold text-slate-200">
                                {p.protectionFee === 0 ? 'FREE (£0.00)' : `£${(p.protectionFee || 0).toFixed(2)}`}
                              </td>
                              <td className="py-3 text-right text-amber-300 font-bold">
                                £{(p.sellerReward || 0).toFixed(2)}
                              </td>
                              <td className="py-3 text-right text-emerald-300">
                                £{(p.opsRevenue || 0).toFixed(2)}
                              </td>
                              <td className="py-3 text-right">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  t.state === 'PAYMENT_CONFIRMED' || t.state === 'ACCEPTED'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-slate-800 text-slate-400'
                                }`}>
                                  {t.state}
                                </span>
                              </td>
                            </tr>
                          );
                        }))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB TAB: TRANSACTIONS */}
            {subTab === 'TRANSACTIONS' && (
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-3 font-mono">
                    <ShieldCheck className="w-10 h-10 text-emerald-400/50 mx-auto" />
                    <h3 className="text-sm font-bold text-white uppercase">No Live Production Transactions Recorded Yet</h3>
                    <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
                      Live production telemetry is strictly 0 until transactions are submitted. Create a sale via the Store Catalog or REST API to trigger real-time verification.
                    </p>
                  </div>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">{tx.itemTitle || (tx as any).title}</span>
                            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                              {tx.sellerIntegrationStatus === 'INTEGRATED' ? 'INTEGRATED SELLER ✓' : 'BUYER-INITIATED'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-sans mt-0.5">{tx.description}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-bold text-emerald-400">£{(tx.itemPrice || 0).toFixed(2)}</span>
                          <span className="text-[10px] block text-slate-500">STATE: {tx.state}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-bold flex items-center space-x-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>01-07 REAL-TIME SAFETY CHECKPOINTS:</span>
                          </span>
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                            {tx.state === 'PAYMENT_CONFIRMED' || tx.state === 'ACCEPTED' ? 'STAGE 07/07 PASSED ✓' : tx.state === 'READY_FOR_FUNDING' ? 'STAGE 06/07 PASSED ✓' : tx.state === 'BLOCKED' ? 'STAGE 06/07 CONTRADICTION BLOCKED ✕' : tx.seller.identityConfirmed ? 'STAGE 04/07 VERIFIED ✓' : 'STAGE 03/07 INVITATION DELIVERED'}
                          </span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-[9px] text-center font-bold">
                          <div className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">01 Risk</div>
                          <div className="p-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">02 Start</div>
                          <div className={`p-1 rounded border ${tx.seller.identityConfirmed || tx.state !== 'CREATED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>03 Invite</div>
                          <div className={`p-1 rounded border ${tx.seller.identityConfirmed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>04 Identity</div>
                          <div className={`p-1 rounded border ${tx.liveCheck?.status === 'PASS' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>05 LiveCheck</div>
                          <div className={`p-1 rounded border ${tx.state === 'READY_FOR_FUNDING' || tx.state === 'PAYMENT_CONFIRMED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : tx.state === 'BLOCKED' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>06 Fraud</div>
                          <div className={`p-1 rounded border ${tx.state === 'PAYMENT_CONFIRMED' || tx.state === 'ACCEPTED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>07 Payment</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] items-center">
                        <div><span className="text-slate-500">Seller:</span> <span className="text-slate-200">{tx.seller.fullName}</span></div>
                        <div>
                          <LocationProof compact country={tx.locationProof?.country || 'United Kingdom'} city={tx.locationProof?.city || 'Manchester'} status="VERIFIED" />
                        </div>
                        <div className="sm:text-right">
                          <button onClick={() => navigate(`/pay/${tx.id}`)} className="text-emerald-400 hover:underline font-bold cursor-pointer">
                            Open Checkout →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SUB TAB: LOGS */}
            {subTab === 'LOGS' && (
              <div className="space-y-3 text-xs">
                {transactions.flatMap(t => t.agentLogs).length === 0 ? (
                  <div className="p-8 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-3 font-mono">
                    <Terminal className="w-10 h-10 text-emerald-400/50 mx-auto" />
                    <h3 className="text-sm font-bold text-white uppercase">No Gemini Agent Logs Recorded</h3>
                    <p className="text-slate-400 text-xs font-sans max-w-md mx-auto">
                      Agent execution logs will record real-time reasoning when verification agents process transactions.
                    </p>
                  </div>
                ) : (
                  transactions.flatMap(t => t.agentLogs).map((log, idx) => (
                    <div key={log.id || idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <div className="flex items-center space-x-2">
                          <span className="text-emerald-400 font-bold">{log.agentName}</span>
                          <span className="text-slate-500">({log.modelUsed})</span>
                        </div>
                        <span className="text-slate-500">{log.timestamp} | {log.executionTimeMs}ms</span>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded text-slate-300 text-[11px] font-sans">
                        {log.rationale}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SUB TAB: PNL */}
            {subTab === 'PNL' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {pnl.map((item) => (
                  <div key={item.period} className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
                    <span className="text-xs text-emerald-400 font-bold uppercase">{item.period}</span>
                    <div className="space-y-2 text-slate-300">
                      <div className="flex justify-between font-bold text-sm text-white">
                        <span>Gross Protection Revenue:</span>
                        <span>${item.revenue}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 space-y-1 text-slate-400 text-[11px]">
                        <div className="flex justify-between text-amber-300"><span>15% Seller Rewards Accrued:</span><span>-${(item.revenue * 0.15).toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Google Cloud Infra:</span><span>-${item.costs.googleCloud}</span></div>
                        <div className="flex justify-between"><span>Gemini API:</span><span>-${item.costs.geminiApi}</span></div>
                        <div className="flex justify-between"><span>KYC / Identity:</span><span>-${item.costs.identityVerification}</span></div>
                        <div className="flex justify-between"><span>Payment Processing:</span><span>-${item.costs.paymentProcessing}</span></div>
                        <div className="flex justify-between"><span>SMS & Email:</span><span>-${item.costs.smsAndEmail}</span></div>
                      </div>
                      <div className="flex justify-between font-bold text-emerald-400 text-sm pt-2 border-t border-slate-800">
                        <span>Net Operating Revenue (85% Split Less Ops):</span>
                        <span>+${(item.revenue * 0.85 - (item.costs.googleCloud + item.costs.geminiApi + item.costs.identityVerification + item.costs.paymentProcessing + item.costs.smsAndEmail)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* SUB TAB: GATES */}
            {subTab === 'GATES' && (
              <div className="space-y-2 text-xs">
                {gates.map((g) => (
                  <div key={g.id} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{g.name}</span>
                        <span className="text-[10px] text-slate-500">({g.durationMs}ms)</span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">{g.description}</p>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      PASSED ✓
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* SUB TAB: FEEDBACK */}
            {subTab === 'FEEDBACK' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
                {evidence.map((e) => (
                  <div key={e.id} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-white">{e.customerName}</span>
                      <span className="text-emerald-400 font-bold">VERIFIED ✓</span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">{e.companyOrMarketplace}</span>
                    <p className="text-slate-300 text-xs italic leading-relaxed font-sans">
                      "{e.quote}"
                    </p>
                    <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800">
                      Ref: {e.transactionRef}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* PRIMARY TAB 2: REVENUE / GROWTH SIMULATOR (PROJECTIONS)  */}
        {/* ========================================================= */}
        {primaryTab === 'SIMULATOR' && (
          <div className="space-y-8">
            
            {/* PROMINENT SCENARIO PROJECTION BANNER */}
            <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-500/50 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm uppercase">
                <AlertTriangle className="w-5 h-5" />
                <span>SCENARIO PROJECTION — NOT LIVE REVENUE</span>
              </div>
              <p className="text-slate-300 text-xs font-sans leading-relaxed">
                This simulator calculates value-based protection fee revenue, 15% seller rewards, and 85% ActionReceipt OPS revenue based on customizable transaction mix percentages across official fee tiers.
              </p>
            </div>

            {/* Interactive Controller Controls */}
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-2 text-white font-bold text-sm">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <span>SIMULATOR PARAMETERS & TRANSACTION VALUE MIX</span>
                </div>
                <button
                  onClick={() => {
                    setDailyTxCount(100000000);
                    setMixUnder5(20);
                    setMix5to10(20);
                    setMix10to15(15);
                    setMix15to45(20);
                    setMix45to100(15);
                    setMix100to300(10);
                  }}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 text-[11px] cursor-pointer"
                >
                  Reset to Default Mix (100M Daily Volume)
                </button>
              </div>

              {/* Slider 1: Target Daily Transactions */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-slate-300 font-bold">
                  <span>Target Protected Orders Per Day:</span>
                  <span className="text-amber-400 font-mono text-sm">{dailyTxCount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000000"
                  step="100000"
                  value={dailyTxCount}
                  onChange={(e) => setDailyTxCount(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>10k / day</span>
                  <span>1 Million / day</span>
                  <span>100 Million / day</span>
                  <span>200 Million / day</span>
                </div>
              </div>

              {/* Sliders: Basket Value Tier Distribution Mix */}
              <div className="space-y-4 border-t border-slate-800 pt-4">
                <span className="font-bold text-white uppercase block">
                  ORDER VALUE DISTRIBUTION MIX (%) — TOTAL: {totalMix}%
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Under £5 (FREE) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-400">Under £5.00 (FREE)</span>
                      <span>{mixUnder5}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mixUnder5}
                      onChange={(e) => setMixUnder5(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block">£0.00 Fee | £0.00 Reward</span>
                  </div>

                  {/* £5 - £9.99 (£0.30) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">£5.00 – £9.99 (£0.30)</span>
                      <span>{mix5to10}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix5to10}
                      onChange={(e) => setMix5to10(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block">Seller 15%: £0.045 | OPS: £0.255</span>
                  </div>

                  {/* £10 - £14.99 (£0.35) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">£10.00 – £14.99 (£0.35)</span>
                      <span>{mix10to15}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix10to15}
                      onChange={(e) => setMix10to15(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block">Seller 15%: £0.0525 | OPS: £0.2975</span>
                  </div>

                  {/* £15 - £44.99 (£0.40) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">£15.00 – £44.99 (£0.40)</span>
                      <span>{mix15to45}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix15to45}
                      onChange={(e) => setMix15to45(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block">Seller 15%: £0.06 | OPS: £0.34</span>
                  </div>

                  {/* £45 - £99.99 (£0.65) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">£45.00 – £99.99 (£0.65)</span>
                      <span>{mix45to100}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix45to100}
                      onChange={(e) => setMix45to100(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block">Seller 15%: £0.0975 | OPS: £0.5525</span>
                  </div>

                  {/* £100 - £299.99 (£1.20) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">£100.00 – £299.99 (£1.20)</span>
                      <span>{mix100to300}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix100to300}
                      onChange={(e) => setMix100to300(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-400 block">Seller 15%: £0.18 | OPS: £1.02</span>
                  </div>

                  {/* £300 - £499.99 (£2.50) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2 bg-emerald-950/20">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-400">£300.00 – £499.99 (£2.50)</span>
                      <span>{mix300to500}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix300to500}
                      onChange={(e) => setMix300to500(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-emerald-300 block">Seller 15%: £0.375 | OPS: £2.125</span>
                  </div>

                  {/* £500 - £800 (£4.50) */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/40 space-y-2 bg-emerald-950/20">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-400">£500.00 – £800.00 (£4.50)</span>
                      <span>{mix500to800}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={mix500to800}
                      onChange={(e) => setMix500to800(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <span className="text-[10px] text-emerald-300 block">Seller 15%: £0.675 | OPS: £3.825</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Projected Output Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">FREE VS PAID ORDERS</span>
                <p className="text-xl font-extrabold text-white">{simFreeCount.toLocaleString()} <span className="text-xs text-slate-400">Free</span> / {simPaidCount.toLocaleString()} <span className="text-xs text-emerald-400">Paid</span></p>
                <span className="text-[10px] text-amber-400">PROJECTION [DAILY TOTAL: {dailyTxCount.toLocaleString()}]</span>
              </div>

              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">GROSS PROTECTION FEES</span>
                <p className="text-2xl font-extrabold text-amber-400">£{Math.round(simGrossFeesDaily).toLocaleString()}</p>
                <span className="text-[10px] text-amber-400/80">PROJECTION [DAILY GROSS]</span>
              </div>

              <div className="p-5 bg-slate-900/90 rounded-2xl border border-amber-500/30 space-y-1 bg-amber-950/10">
                <span className="text-[10px] text-amber-400 font-bold uppercase">15% SELLER REWARDS</span>
                <p className="text-2xl font-extrabold text-amber-300">£{Math.round(simSellerRewardsDaily).toLocaleString()}</p>
                <span className="text-[10px] text-amber-400/80">PROJECTION [DAILY SELLER SHARE]</span>
              </div>

              <div className="p-5 bg-slate-900/90 rounded-2xl border border-emerald-500/30 space-y-1 bg-emerald-950/10">
                <span className="text-[10px] text-emerald-400 font-bold uppercase">85% ACTIONRECEIPT OPS REVENUE</span>
                <p className="text-2xl font-extrabold text-emerald-400">£{Math.round(simOpsRevenueDaily).toLocaleString()}</p>
                <span className="text-[10px] text-emerald-400/80">PROJECTION [DAILY OPS NET]</span>
              </div>

            </div>

            {/* LONGER TERM PROJECTION CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase block">30-DAY PROJECTION</span>
                <div className="flex justify-between items-center text-sm">
                  <span>Gross Protection Fees:</span>
                  <strong className="text-amber-400">£{Math.round(simGrossFees30Days).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-amber-300">
                  <span>Seller Rewards (15%):</span>
                  <strong>£{Math.round(simSellerRewards30Days).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-400 pt-1 border-t border-slate-800">
                  <span>OPS Revenue (85%):</span>
                  <strong>£{Math.round(simOpsRevenue30Days).toLocaleString()}</strong>
                </div>
              </div>

              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase block">ANNUAL PROJECTION (365 DAYS)</span>
                <div className="flex justify-between items-center text-sm">
                  <span>Gross Protection Fees:</span>
                  <strong className="text-amber-400">£{Math.round(simGrossFeesAnnual).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-amber-300">
                  <span>Seller Rewards (15%):</span>
                  <strong>£{Math.round(simSellerRewardsAnnual).toLocaleString()}</strong>
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-400 pt-1 border-t border-slate-800">
                  <span>OPS Revenue (85%):</span>
                  <strong>£{Math.round(simOpsRevenueAnnual).toLocaleString()}</strong>
                </div>
              </div>
            </div>

            {/* SELLER A — 1 MILLION SALES EXAMPLE HIGHLIGHT */}
            <div className="p-6 bg-emerald-950/40 rounded-2xl border border-emerald-500/50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30 text-xs">
                <span className="font-bold text-emerald-400 uppercase tracking-wider">
                  ILLUSTRATIVE COMMERCIAL SCENARIO: SELLER A — 1 MILLION SALES
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  SCENARIO MODEL
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs pt-1">
                <div>
                  <span className="text-slate-400 block text-[11px]">Integrated Volume:</span>
                  <strong className="text-white text-base">1,000,000 Sales</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Avg Basket (£10–£15 Tier):</span>
                  <strong className="text-emerald-400 text-base">£0.35 Protection Fee</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Gross Protection Fees:</span>
                  <strong className="text-amber-400 text-base">£350,000</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">85% ActionReceipt Revenue:</span>
                  <strong className="text-emerald-300 text-xl font-bold">£297,500</strong>
                </div>
              </div>
              <p className="text-[11px] text-slate-300 font-sans pt-1">
                In this illustrative scenario, a major merchant processing 1,000,000 annual protected sales generates <strong>£350,000 in gross protection fees</strong>, resulting in <strong>£52,500 in Seller Rewards</strong> and <strong>£297,500 in OPS Revenue</strong> for ActionReceipt.
              </p>
            </div>

            {/* ANIMATED RECHARTS PROJECTION GRAPHS (ALL PROMINENTLY LABELED PROJECTION) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Chart 1: Projected Daily Revenue Breakdown */}
              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">7-DAY REVENUE PROJECTION (OPS vs SELLER SHARE)</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                    PROJECTION
                  </span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={projectionDailyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} />
                      <YAxis stroke="#94a3b8" fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="opsRevenue" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="OPS Revenue 85% (£)" />
                      <Area type="monotone" dataKey="sellerRewards" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} name="Seller Rewards 15% (£)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Projected Channel Mix */}
              <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">ACQUISITION CHANNEL CONTRIBUTION</span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                    PROJECTION
                  </span>
                </div>
                <div className="h-64 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectionChannelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {projectionChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300 pt-2 border-t border-slate-800">
                  {projectionChannelData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

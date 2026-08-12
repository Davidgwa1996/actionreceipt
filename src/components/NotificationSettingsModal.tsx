import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, X, Send, ShieldCheck, Bell, RefreshCw, FileText } from 'lucide-react';
import { Transaction } from '../types';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions?: Transaction[];
}

interface NotificationSettings {
  emailRecipient: string;
  autoSendOnVerification: boolean;
  includeReceiptPdfLink: boolean;
  includeTruthChainProof: boolean;
  notifyOnDispatches: boolean;
}

interface EmailSummaryLog {
  id: string;
  transactionId: string;
  itemTitle: string;
  recipientEmail: string;
  subject: string;
  sentAt: string;
  status: 'DELIVERED' | 'FAILED';
  summaryHtml: string;
  amount: number;
  currency: string;
  truthChainProofHash: string;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  transactions = []
}) => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailRecipient: 'njaudavid5@gmail.com',
    autoSendOnVerification: true,
    includeReceiptPdfLink: true,
    includeTruthChainProof: true,
    notifyOnDispatches: true
  });
  const [logs, setLogs] = useState<EmailSummaryLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'logs'>('settings');
  const [selectedLog, setSelectedLog] = useState<EmailSummaryLog | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSettingsAndLogs();
    }
  }, [isOpen]);

  const fetchSettingsAndLogs = async () => {
    setLoading(true);
    try {
      const [resSettings, resLogs] = await Promise.all([
        fetch('/api/notifications/settings').then(r => r.json()),
        fetch('/api/notifications/logs').then(r => r.json())
      ]);
      if (resSettings && !resSettings.error) {
        setSettings(resSettings);
      }
      if (Array.isArray(resLogs)) {
        setLogs(resLogs);
      }
    } catch (err) {
      console.error('Error fetching notification settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notifications/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data) {
        setToastMsg('✓ Notification settings saved successfully.');
        setTimeout(() => setToastMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendTestSummary = async () => {
    setSendingTest(true);
    try {
      const targetTxId = transactions.length > 0 ? transactions[0].id : 'TX-MSQ-882190';
      const res = await fetch('/api/notifications/send-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: targetTxId,
          recipientEmail: settings.emailRecipient
        })
      });
      const data = await res.json();
      if (data.status === 'SUCCESS') {
        setToastMsg(`✓ Automated email summary sent to ${settings.emailRecipient}!`);
        setTimeout(() => setToastMsg(null), 4000);
        fetchSettingsAndLogs();
      }
    } catch (err) {
      console.error('Error sending test summary:', err);
    } finally {
      setSendingTest(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Notification Service Integration</h2>
              <p className="text-xs text-slate-400">Automated email summaries for verified remote purchases</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 font-bold border-b-2 transition cursor-pointer flex items-center space-x-2 ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>CONFIG & TRIGGER</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-3 px-4 font-bold border-b-2 transition cursor-pointer flex items-center space-x-2 ${
              activeTab === 'logs'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>DISPATCH LOGS ({logs.length})</span>
          </button>
        </div>

        {/* TOAST MESSAGE */}
        {toastMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-mono font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'settings' ? (
            <div className="space-y-5">
              
              {/* RECIPIENT EMAIL */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold text-slate-300">
                  RECIPIENT EMAIL ADDRESS FOR AUTOMATED SUMMARIES
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
                  <input
                    type="email"
                    value={settings.emailRecipient}
                    onChange={(e) => setSettings({ ...settings, emailRecipient: e.target.value })}
                    placeholder="e.g. njaudavid5@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Automated receipt summaries and TruthChain proof hashes will be sent to this inbox immediately after purchase verification.
                </p>
              </div>

              {/* TOGGLES */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <label className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Auto-Send on Successful Remote Verification</span>
                    <span className="text-[11px] text-slate-400 block">Automatically trigger summary email when transaction reaches READY_FOR_FUNDING or ACCEPTED</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoSendOnVerification}
                    onChange={(e) => setSettings({ ...settings, autoSendOnVerification: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Include Digital ActionReceipt PDF Link</span>
                    <span className="text-[11px] text-slate-400 block">Embed direct link to view item condition, serial proof, and verification proof</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.includeReceiptPdfLink}
                    onChange={(e) => setSettings({ ...settings, includeReceiptPdfLink: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">Include TruthChain Verification Proof Hash</span>
                    <span className="text-[11px] text-slate-400 block">Include cryptographic audit hash of 7 seller & item reconciliation checks</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.includeTruthChainProof}
                    onChange={(e) => setSettings({ ...settings, includeTruthChainProof: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-emerald-500"
                  />
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleSendTestSummary}
                  disabled={sendingTest}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono font-bold text-xs cursor-pointer transition flex items-center space-x-2 border border-slate-700"
                >
                  <Send className={`w-4 h-4 ${sendingTest ? 'animate-spin' : ''}`} />
                  <span>{sendingTest ? 'DISPATCHING TEST SUMMARY...' : 'SEND TEST EMAIL SUMMARY NOW'}</span>
                </button>

                <button
                  onClick={handleSaveSettings}
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs cursor-pointer transition shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>SAVE NOTIFICATION SETTINGS</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs font-mono">
                  No email summaries dispatched yet. Click "Send Test Email Summary Now" to generate one.
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                      className={`p-4 rounded-2xl border transition cursor-pointer ${
                        selectedLog?.id === log.id
                          ? 'bg-slate-950 border-emerald-500/50'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                            {log.status}
                          </span>
                          <span className="font-bold text-white">{log.itemTitle}</span>
                        </div>
                        <span className="text-slate-500 text-[11px]">{new Date(log.sentAt).toLocaleTimeString()}</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Recipient: <strong className="text-slate-200">{log.recipientEmail}</strong></span>
                        <span className="text-emerald-400 font-bold">£{(log.amount || 0).toFixed(2)} {log.currency}</span>
                      </div>

                      {/* EXPANDED PREVIEW */}
                      {selectedLog?.id === log.id && (
                        <div className="mt-3 pt-3 border-t border-slate-800 space-y-2">
                          <p className="text-[10px] text-slate-400">Proof Hash: <code className="text-emerald-400">{log.truthChainProofHash}</code></p>
                          <div
                            className="p-3 bg-slate-900 border border-slate-800 rounded-xl max-h-60 overflow-y-auto text-slate-300 text-[11px]"
                            dangerouslySetInnerHTML={{ __html: log.summaryHtml }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-[11px] font-mono text-slate-400">
          <span>ActionReceipt Engine • Service Connected</span>
          <button
            onClick={fetchSettingsAndLogs}
            className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { FileSearch, Upload, CheckCircle2, AlertTriangle, X, Sparkles, Receipt, RefreshCw, DollarSign, Building } from 'lucide-react';

interface ReceiptAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultExpectedMerchant?: string;
  defaultExpectedTotal?: number;
  defaultExpectedCurrency?: string;
}

interface AnalysisResult {
  merchantName: string;
  totalAmount: number;
  currency: string;
  date: string;
  lineItems: Array<{ description: string; amount: number }>;
  confidenceScore: number;
  verificationResult: 'MATCH' | 'MISMATCH' | 'SUSPICIOUS';
  mismatchNotes: string;
  geminiRationale: string;
}

export const ReceiptAnalyzerModal: React.FC<ReceiptAnalyzerModalProps> = ({
  isOpen,
  onClose,
  defaultExpectedMerchant = 'Apple Store UK (MarketSquare Verified)',
  defaultExpectedTotal = 650.00,
  defaultExpectedCurrency = 'GBP'
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [expectedMerchant, setExpectedMerchant] = useState(defaultExpectedMerchant);
  const [expectedTotal, setExpectedTotal] = useState<number>(defaultExpectedTotal);
  const [expectedCurrency, setExpectedCurrency] = useState(defaultExpectedCurrency);
  
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Sample receipt image generator if user doesn't have an image ready
  const loadSampleReceipt = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 600, 800);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 28px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('APPLE STORE UK', 300, 70);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#475569';
      ctx.fillText('Regent Street, London W1B 2EL', 300, 100);
      ctx.fillText(`VAT No: GB 842 1290 82 • ${new Date().toISOString().split('T')[0]}`, 300, 125);

      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(40, 150);
      ctx.lineTo(560, 150);
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.font = 'bold 18px monospace';
      ctx.fillStyle = '#0f172a';
      ctx.fillText('iPhone 15 Pro Max 256GB Natural', 50, 200);
      ctx.textAlign = 'right';
      ctx.fillText('£650.00', 550, 200);

      ctx.textAlign = 'left';
      ctx.font = '14px monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText('Includes Standard UK Warranty & Serial Proof', 50, 230);

      ctx.beginPath();
      ctx.moveTo(40, 680);
      ctx.lineTo(560, 680);
      ctx.stroke();

      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = '#059669';
      ctx.fillText('TOTAL PAID (GBP)', 50, 730);
      ctx.textAlign = 'right';
      ctx.fillText('£650.00', 550, 730);

      setSelectedImage(canvas.toDataURL('image/jpeg'));
      setResult(null);
      setErrorMsg(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMsg('Please select or upload a receipt image first.');
      return;
    }

    setAnalyzing(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/analyze-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          expectedMerchant,
          expectedTotal,
          expectedCurrency
        })
      });

      const data = await res.json();
      if (data.error) {
        setErrorMsg(data.error);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Receipt analysis failed.');
    } finally {
      setAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Gemini Receipt Analysis Service</h2>
              <p className="text-xs text-slate-400">Multimodal receipt OCR & transaction cross-referencing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* EXPECTATIONS FORM */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-950/80 border border-slate-800 rounded-2xl font-mono text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">EXPECTED MERCHANT</label>
              <input
                type="text"
                value={expectedMerchant}
                onChange={(e) => setExpectedMerchant(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">EXPECTED TOTAL (£)</label>
              <input
                type="number"
                value={expectedTotal}
                onChange={(e) => setExpectedTotal(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">CURRENCY</label>
              <input
                type="text"
                value={expectedCurrency}
                onChange={(e) => setExpectedCurrency(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* UPLOAD / IMAGE PREVIEW AREA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* UPLOD BOX */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 text-center flex flex-col items-center justify-center bg-slate-950/40 transition space-y-3 relative group"
            >
              {selectedImage ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img src={selectedImage} alt="Uploaded Receipt" className="w-full h-full object-contain" />
                  <button
                    onClick={() => { setSelectedImage(null); setResult(null); }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">Drag & drop receipt image here</p>
                    <p className="text-[11px] text-slate-500 font-mono">PNG, JPG, or WEBP up to 10MB</p>
                  </div>

                  <label className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono font-bold text-xs cursor-pointer transition border border-slate-700 inline-block">
                    <span>BROWSE FILE</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>

                  <div className="pt-2 border-t border-slate-800/80 w-full">
                    <button
                      type="button"
                      onClick={loadSampleReceipt}
                      className="text-[11px] font-mono text-emerald-400 hover:underline cursor-pointer"
                    >
                      + Generate Sample Receipt Image
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* ANALYSIS RESULT DISPLAY */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 font-mono text-xs flex flex-col justify-between">
              {analyzing ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-3 text-emerald-400">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                  <p className="font-bold text-xs">GEMINI 3.6 FLASH ANALYZING RECEIPT...</p>
                  <p className="text-[10px] text-slate-500">Extracting merchant, totals, line items, & currency</p>
                </div>
              ) : result ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">GEMINI VERIFICATION RESULT</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] flex items-center space-x-1 ${
                      result.verificationResult === 'MATCH'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {result.verificationResult === 'MATCH' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      <span>{result.verificationResult}</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Extracted Merchant:</span>
                      <span className="text-white font-bold">{result.merchantName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Amount:</span>
                      <span className="text-emerald-400 font-bold">£{(result.totalAmount || 0).toFixed(2)} {result.currency}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Confidence Score:</span>
                      <span className="text-emerald-300 font-bold">{result.confidenceScore}%</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-slate-400 text-[10px] font-bold block">LINE ITEMS:</span>
                    {result.lineItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-slate-300">
                        <span>• {item.description}</span>
                        <span className="font-bold">£{(item.amount || 0).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
                    <strong>Gemini Rationale:</strong> {result.geminiRationale}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Upload a receipt image and click "Run Gemini Receipt Analysis" to cross-reference merchant, totals, and currency.
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                  {errorMsg}
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={analyzing || !selectedImage}
                className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-slate-950 font-bold text-xs cursor-pointer transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
              >
                <FileSearch className="w-4 h-4" />
                <span>RUN GEMINI RECEIPT ANALYSIS</span>
              </button>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-[11px] font-mono text-slate-400">
          <span>ActionReceipt Engine • Gemini 3.6 Flash Vision</span>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-bold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

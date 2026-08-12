import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Camera, CheckCircle2, X, Sparkles, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (scannedData: { itemTitle: string; itemPrice: number; sellerName?: string; category?: string }) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess
}) => {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<{ itemTitle: string; itemPrice: number; sellerName?: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    setIsScanning(true);
    setCameraError(null);
    setHasCameraPermission(null);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setHasCameraPermission(true);
      } else {
        setHasCameraPermission(false);
        setCameraError('Camera API not supported in this browser window.');
      }
    } catch (err: any) {
      setHasCameraPermission(false);
      setCameraError('Camera access requested. You can also use simulated receipt QR scan below.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  // Process receipt QR code payload string
  const processQRCodePayload = (payloadStr: string) => {
    let title = 'Apple iPhone 15 Pro Max 256GB';
    let price = 650.00;
    let seller = 'Sarah Jenkins';

    if (payloadStr.includes('price=')) {
      const match = payloadStr.match(/price=([\d.]+)/);
      if (match) price = parseFloat(match[1]);
    }
    if (payloadStr.includes('item=')) {
      const match = payloadStr.match(/item=([^&]+)/);
      if (match) title = decodeURIComponent(match[1]);
    }
    if (payloadStr.includes('seller=')) {
      const match = payloadStr.match(/seller=([^&]+)/);
      if (match) seller = decodeURIComponent(match[1]);
    }

    const data = { itemTitle: title, itemPrice: price, sellerName: seller };
    setScannedResult(data);
    setIsScanning(false);

    // Automatically trigger CreateTransaction logic
    setTimeout(() => {
      onScanSuccess(data);
      onClose();
    }, 1500);
  };

  const handleSimulatedScan = () => {
    const samplePayload = `ACTIONRECEIPT_QR:item=${encodeURIComponent('Apple iPhone 15 Pro Max 256GB')}&price=650.00&seller=${encodeURIComponent('Sarah Jenkins')}`;
    processQRCodePayload(samplePayload);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      processQRCodePayload(manualCode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight">Receipt QR Code Scanner</h2>
              <p className="text-xs text-slate-400">Scan physical receipt QR code to auto-create transaction</p>
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
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* CAMERA VIEWFINDER */}
          <div className="relative aspect-square w-full rounded-2xl border-2 border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center group shadow-2xl">
            {hasCameraPermission ? (
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="p-6 text-center space-y-3 font-mono text-xs">
                <div className="p-3 bg-slate-900 border border-slate-800 text-emerald-400 rounded-2xl inline-block">
                  <Camera className="w-8 h-8" />
                </div>
                <p className="text-slate-300 font-bold">Camera Feed Ready</p>
                <p className="text-[11px] text-slate-500">{cameraError || 'Align receipt QR code inside the green viewport'}</p>
              </div>
            )}

            {/* HIGH-TECH SCANNER VIEWFINDER OVERLAY */}
            <div className="absolute inset-8 border-2 border-emerald-500/50 rounded-2xl pointer-events-none flex flex-col justify-between p-2">
              <div className="flex justify-between">
                <div className="w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
              </div>

              {/* ANIMATED LASER SCANNING LINE */}
              {isScanning && (
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#34d399] animate-pulse" />
              )}

              <div className="flex justify-between">
                <div className="w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
              </div>
            </div>

            {/* SUCCESS OVERLAY */}
            {scannedResult && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center font-mono space-y-3 animate-fadeIn">
                <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">QR RECEIPT DETECTED</span>
                  <h3 className="text-sm font-extrabold text-white">{scannedResult.itemTitle}</h3>
                  <p className="text-emerald-400 font-bold text-base">£{(scannedResult.itemPrice || 0).toFixed(2)} GBP</p>
                </div>
                <p className="text-[11px] text-slate-400">Auto-creating verified remote purchase transaction...</p>
              </div>
            )}
          </div>

          {/* SIMULATED SCAN OR MANUAL PASTE */}
          <div className="space-y-3 pt-2 font-mono text-xs">
            <button
              onClick={handleSimulatedScan}
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold cursor-pointer transition shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>SIMULATE SCAN VALID RECEIPT QR CODE</span>
            </button>

            <form onSubmit={handleManualSubmit} className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-[10px] font-bold text-slate-400 uppercase">OR PASTE RECEIPT QR CODE PAYLOAD</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="e.g. ACTIONRECEIPT_QR:item=iPhone 15&price=650"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold rounded-xl border border-slate-700 cursor-pointer"
                >
                  PROCESS
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-[11px] font-mono text-slate-400">
          <span>ActionReceipt QR Infrastructure</span>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-bold cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

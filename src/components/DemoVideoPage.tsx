import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Sparkles, 
  ShieldCheck, MousePointer, Volume1, Film, Download, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import msq01 from '../assets/images/msq_deals_page_1786294160392.jpg';
import msq02 from '../assets/images/msq_product_detail_1786294184450.jpg';
import msq03 from '../assets/images/msq_gemini_verifying_1786294207296.jpg';
import msq04 from '../assets/images/msq_verified_ready_1786294231657.jpg';
import msq05 from '../assets/images/msq_checkout_payment_1786294254625.jpg';
import msq06 from '../assets/images/msq_payment_done_1786294277779.jpg';

interface DemoVideoPageProps {
  navigate: (route: string) => void;
  onOpenCreateTx: () => void;
}

export interface VideoScene {
  id: number;
  code: string;
  title: string;
  chapterLabel: string;
  startTime: number;
  endTime: number;
  clickTimeOffset: number;
  image: string;
  voiceoverText: string;
  badgeText: string;
  targetPos: { xPercent: number; yPercent: number };
}

export const SAFETY_PURCHASE_SCENES: VideoScene[] = [
  {
    id: 1,
    code: '01_MarketSquare_Discovery',
    title: 'Marketplace Listing Discovery & Verified Badge',
    chapterLabel: 'STAGE 1: MARKETPLACE LISTING DISCOVERY',
    startTime: 0,
    endTime: 30,
    clickTimeOffset: 18,
    image: msq01,
    voiceoverText: 'Welcome to MarketSquare. When browsing high-value items online, like this XPhone Pro listed for six hundred and fifty pounds, notice the blue Verified with ActionReceipt badge. This badge confirms that the seller identity and account are pre-verified before you interact. Let us click View Listing to examine the item details.',
    badgeText: 'VERIFIED LISTING DISCOVERY',
    targetPos: { xPercent: 54, yPercent: 76 }
  },
  {
    id: 2,
    code: '02_Listing_Details',
    title: 'Seller Trust & Product Inspection',
    chapterLabel: 'STAGE 2: SELLER TRUST & PRODUCT INSPECTION',
    startTime: 30,
    endTime: 60,
    clickTimeOffset: 48,
    image: msq02,
    voiceoverText: 'On the product detail page, ActionReceipt provides full transparency. You can inspect the verified seller profile, storage capacity, and item condition before sending any money. Everything is clearly documented up front. Now, let us click Verify Purchase to start the protected checkout process.',
    badgeText: 'ACTIONRECEIPT VERIFIED SELLER',
    targetPos: { xPercent: 61, yPercent: 83 }
  },
  {
    id: 3,
    code: '03_Gemini_Verification',
    title: 'Gemini Real-Time Verification & GPS LocationProof',
    chapterLabel: 'STAGE 3: GEMINI REAL-TIME VERIFICATION',
    startTime: 60,
    endTime: 90,
    clickTimeOffset: 78,
    image: msq03,
    voiceoverText: 'Behind the scenes, Gemini instantly executes a multi-point verification check. It verifies seller identity, matches bank payout records, confirms listing authenticity, reviews product evidence, checks GPS location consistency with LocationProof, and anchors proof on TruthChain. Notice the top-right LocationProof GPS Verified badge, guaranteeing total protection against fake locations and stolen listing scams.',
    badgeText: 'GEMINI VERIFICATION WITH GPS LOCATIONPROOF ✓',
    targetPos: { xPercent: 50, yPercent: 50 }
  },
  {
    id: 4,
    code: '04_Purchase_Verified',
    title: 'Security Clearance & Ready for Payment',
    chapterLabel: 'STAGE 4: PURCHASE VERIFIED & CLEARED',
    startTime: 90,
    endTime: 120,
    clickTimeOffset: 108,
    image: msq04,
    voiceoverText: 'Within moments, all security checkpoints pass successfully with full confidence. The purchase is now one hundred percent verified and cleared as safe. With total peace of mind, we can click Pay With ActionReceipt to proceed with the payment.',
    badgeText: '100% VERIFIED & SECURE ✓',
    targetPos: { xPercent: 58, yPercent: 81 }
  },
  {
    id: 5,
    code: '05_Instant_Payment_Checkout',
    title: 'Instant Verified Payment Checkout',
    chapterLabel: 'STAGE 5: INSTANT VERIFIED PAYMENT CHECKOUT',
    startTime: 120,
    endTime: 150,
    clickTimeOffset: 138,
    image: msq05,
    voiceoverText: 'You are now on the secure checkout screen. Because purchase verification and payment verification passed, your payment is processed and released instantly at checkout without any escrow holds or delay. Let us click Confirm Payment of six hundred and fifty pounds to complete the purchase.',
    badgeText: 'INSTANT VERIFIED CHECKOUT',
    targetPos: { xPercent: 49, yPercent: 90 }
  },
  {
    id: 6,
    code: '06_Instant_Release_Order_Placed',
    title: 'Instant Release & Order Placed',
    chapterLabel: 'STAGE 6: INSTANT RELEASE & ORDER PLACED',
    startTime: 150,
    endTime: 180,
    clickTimeOffset: 168,
    image: msq06,
    voiceoverText: 'Payment confirmed and instantly released! The four pound fifty protection fee is split between Ops Revenue and Seller Rewards, while the net six hundred and forty-five pounds fifty pence is released instantly to the seller. Your order is officially placed and the pre-payment trust phase is complete. Thank you for choosing ActionReceipt.',
    badgeText: 'INSTANT RELEASE & ORDER PLACED ✓',
    targetPos: { xPercent: 80, yPercent: 79 }
  }
];

// Audio FX helper using Web Audio API
const playAudioFx = (type: 'click' | 'chime') => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch {
    // Graceful fallback
  }
};

export const DemoVideoPage: React.FC<DemoVideoPageProps> = ({ navigate, onOpenCreateTx }) => {
  const TOTAL_DURATION = 180; // Exactly 3 Minutes (6 scenes x 30s)
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceoverEnabled, setVoiceoverEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [downloadFormat, setDownloadFormat] = useState<'mp4' | 'webm'>('mp4');
  const [audioSyncOffset, setAudioSyncOffset] = useState<number>(0);
  const [lastSpokenSceneId, setLastSpokenSceneId] = useState<number | null>(null);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [useNativeVideo, setUseNativeVideo] = useState<boolean>(true);
  const [savedResumeTime, setSavedResumeTime] = useState<number | null>(null);

  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const clickTriggeredRef = useRef<{ [sceneId: number]: boolean }>({});

  const currentScene = SAFETY_PURCHASE_SCENES.find(s => currentTime >= s.startTime && currentTime < s.endTime) || SAFETY_PURCHASE_SCENES[SAFETY_PURCHASE_SCENES.length - 1];

  // Pre-load and cache image assets locally into browser Cache / memory
  const loadedImagesRef = useRef<{ [id: number]: HTMLImageElement }>({});

  // LocalStorage timestamp persistence key
  const TIMESTAMP_KEY = 'actionreceipt_demo_video_timestamp';

  // 1. Restore saved playback position on mount
  useEffect(() => {
    const saved = localStorage.getItem(TIMESTAMP_KEY);
    if (saved) {
      const parsedTime = parseFloat(saved);
      if (!isNaN(parsedTime) && parsedTime > 2 && parsedTime < TOTAL_DURATION - 2) {
        setSavedResumeTime(parsedTime);
        setCurrentTime(parsedTime);
        if (videoRef.current) {
          videoRef.current.currentTime = parsedTime;
        }
        const mins = Math.floor(parsedTime / 60);
        const secs = Math.floor(parsedTime % 60);
        const timeFormatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        setDownloadToast(`Resumed video playback from ${timeFormatted}`);
        setTimeout(() => setDownloadToast(null), 4000);
      }
    }
  }, []);

  // 2. Persist current timestamp to localStorage on pause or update
  useEffect(() => {
    if (currentTime > 2 && currentTime < TOTAL_DURATION - 1) {
      localStorage.setItem(TIMESTAMP_KEY, currentTime.toString());
    }
  }, [currentTime]);

  useEffect(() => {
    SAFETY_PURCHASE_SCENES.forEach(scene => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = scene.image;
      loadedImagesRef.current[scene.id] = img;
    });
  }, []);

  // Direct High-Definition 1080p Demo Video Downloader with Progress Indicator and Buffer State Validation
  const handleDownloadDemoVideo = () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadToast(`Connecting & buffering high-bitrate 1080p video (${downloadFormat.toUpperCase()})...`);

    const xhr = new XMLHttpRequest();
    const downloadUrl = `/api/download-demo-video?format=${downloadFormat}`;

    xhr.open('GET', downloadUrl, true);
    xhr.responseType = 'blob';

    xhr.onprogress = (e) => {
      if (e.lengthComputable && e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setDownloadProgress(percent);
        setDownloadToast(`Verifying & Downloading 1080p Video Buffer: ${percent}% complete...`);
      } else {
        setDownloadProgress(50);
        setDownloadToast(`Verifying video buffer stream...`);
      }
    };

    xhr.onload = () => {
      // Validate that the returned blob is valid, complete, and not corrupt (size > 100KB)
      if (xhr.status === 200 && xhr.response && xhr.response.size > 100000) {
        setDownloadProgress(100);
        const megabytes = (xhr.response.size / (1024 * 1024)).toFixed(2);
        setDownloadToast(`✓ Video verified (${megabytes} MB, high bitrate). Saving file...`);

        const blob = new Blob([xhr.response], { type: downloadFormat === 'webm' ? 'video/webm' : 'video/mp4' });
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', `ActionReceipt_3Min_Demo_Video_1080p.${downloadFormat}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);

        setTimeout(() => {
          setIsDownloading(false);
          setDownloadProgress(0);
          setDownloadToast(`✓ ActionReceipt_3Min_Demo_Video_1080p.${downloadFormat} (${megabytes} MB) downloaded successfully!`);
          setTimeout(() => setDownloadToast(null), 5000);
        }, 1200);
      } else {
        setIsDownloading(false);
        setDownloadProgress(0);
        setDownloadToast(`⚠️ Download state validation failed. Retrying direct link...`);
        window.open(downloadUrl, '_blank');
        setTimeout(() => setDownloadToast(null), 5000);
      }
    };

    xhr.onerror = () => {
      setIsDownloading(false);
      setDownloadProgress(0);
      setDownloadToast(`⚠️ Download connection interrupted. Retrying direct link...`);
      window.open(downloadUrl, '_blank');
      setTimeout(() => setDownloadToast(null), 5000);
    };

    xhr.send();
  };

  const stageCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll active stage card into view as video plays
  useEffect(() => {
    if (currentScene && stageCardRefs.current[currentScene.id - 1]) {
      stageCardRefs.current[currentScene.id - 1]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [currentScene?.id]);

  // Sync video element playback speed and mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
      videoRef.current.muted = isMuted || !voiceoverEnabled;
    }
  }, [playbackRate, isMuted, voiceoverEnabled]);

  // Handle Video Time Update from Native Video element
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setCurrentTime(TOTAL_DURATION);
  };

  // Continuous fallback timer if native video is not playing
  useEffect(() => {
    if (!isPlaying || useNativeVideo) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      return;
    }

    lastTimeRef.current = performance.now();

    const updateTimer = (now: number) => {
      const delta = ((now - lastTimeRef.current) / 1000) * playbackRate;
      lastTimeRef.current = now;

      setCurrentTime(prev => {
        const next = prev + delta;
        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });

      animationFrameRef.current = requestAnimationFrame(updateTimer);
    };

    animationFrameRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, playbackRate, useNativeVideo]);

  // Trigger simulated pointer click at designated click offset
  useEffect(() => {
    if (!isPlaying) return;

    if (currentTime >= currentScene.clickTimeOffset && !clickTriggeredRef.current[currentScene.id]) {
      clickTriggeredRef.current[currentScene.id] = true;
      triggerClickEffect();
    }
  }, [currentTime, isPlaying, currentScene.id, currentScene.clickTimeOffset]);

  const triggerClickEffect = () => {
    setIsClicking(true);
    if (!isMuted) {
      if (currentScene.id === 6) {
        playAudioFx('chime');
      } else {
        playAudioFx('click');
      }
    }

    setTimeout(() => {
      setIsClicking(false);
    }, 600);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        if (videoRef.current.currentTime >= TOTAL_DURATION) {
          videoRef.current.currentTime = 0;
          setCurrentTime(0);
        }
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }

    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      clickTriggeredRef.current = {};
    }
    setIsPlaying(prev => !prev);
  };

  const jumpToTime = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    jumpToTime(time);
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-6 text-left">
        
        {/* TOP BRANDING BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4 font-mono">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20 font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>3-MINUTE DEMO VIDEO</span>
              </span>
              <span className="text-slate-400 text-xs">FLUID CONTINUOUS PLAYBACK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ACTIONRECEIPT DEMO VIDEO
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* FORMAT SELECTOR & HIGH-QUALITY DOWNLOAD BUTTON */}
            <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setDownloadFormat('mp4')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  downloadFormat === 'mp4' ? 'bg-emerald-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                MP4 HD
              </button>
              <button
                onClick={() => setDownloadFormat('webm')}
                className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                  downloadFormat === 'webm' ? 'bg-emerald-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                WEBM
              </button>
            </div>

            <button
              onClick={handleDownloadDemoVideo}
              disabled={isDownloading}
              className={`relative overflow-hidden px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition flex items-center space-x-2 shadow-lg ${
                isDownloading 
                  ? 'bg-slate-900 text-white border border-emerald-400 cursor-wait' 
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700'
              }`}
            >
              {isDownloading && (
                <div 
                  className="absolute inset-y-0 left-0 bg-emerald-500/30 transition-all duration-200"
                  style={{ width: `${downloadProgress}%` }}
                />
              )}
              <Download className={`w-4 h-4 z-10 ${isDownloading ? 'text-emerald-400 animate-spin' : 'text-emerald-400'}`} />
              <span className="z-10">
                {isDownloading 
                  ? `VERIFYING & DOWNLOADING (${downloadProgress}%)...` 
                  : `DOWNLOAD DEMO VIDEO (.${downloadFormat.toUpperCase()})`}
              </span>
            </button>

            <button
              onClick={onOpenCreateTx}
              className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs cursor-pointer transition shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>TEST LIVE APP CHECKOUT</span>
            </button>
          </div>
        </div>

        {/* DOWNLOAD STATUS TOAST NOTIFICATION */}
        {downloadToast && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-mono font-bold flex items-center justify-between animate-fadeIn shadow-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{downloadToast}</span>
            </div>
            <span className="text-[10px] text-slate-400">Target MIME: video/{downloadFormat}</span>
          </div>
        )}

        {/* MAIN VIDEO PLAYER CANVAS - STABLE & CRISP UNLIMITED VISIBILITY */}
        <div 
          ref={playerRef}
          className={`relative bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl transition-all ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'aspect-video w-full'
          }`}
        >
          {/* PERSISTENT VERIFICATION PROGRESS BAR ACROSS TOP EDGE */}
          <div className="absolute top-0 left-0 right-0 z-30 flex h-2 bg-slate-950/80 border-b border-slate-800/80">
            {SAFETY_PURCHASE_SCENES.map((scene) => {
              const isActive = currentScene.id === scene.id;
              const isPassed = currentTime >= scene.endTime;
              return (
                <button
                  key={`top-progress-bar-step-${scene.id}`}
                  onClick={() => jumpToTime(scene.startTime)}
                  title={`Jump to Stage 0${scene.id}: ${scene.title}`}
                  className={`flex-1 h-full transition-all border-r border-slate-900/60 cursor-pointer relative group ${
                    isActive
                      ? 'bg-emerald-400 shadow-md shadow-emerald-500/50'
                      : isPassed
                      ? 'bg-emerald-600/70 hover:bg-emerald-500'
                      : 'bg-slate-800/70 hover:bg-slate-700'
                  }`}
                >
                  <span className="opacity-0 group-hover:opacity-100 absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-md border border-slate-700 pointer-events-none z-40 shadow-xl">
                    STAGE 0{scene.id}: {scene.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* NATIVE 1080P VIDEO ELEMENT FOR PERFECT PLAY/PAUSE/RESUME ACCURACY */}
          <video
            ref={videoRef}
            src="/ActionReceipt_3Min_Demo_Video_1080p.mp4"
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-contain bg-slate-950 object-center z-10"
          />

          {/* TOP FLOATING STATUS HUD & PLAYBACK HEALTH OVERLAY */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono pointer-events-none">
            <div className="flex items-center space-x-2 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-emerald-400 shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-bold">{currentScene.code}</span>
            </div>

            {/* PLAYBACK HEALTH HUD (FPS & BUFFER STATUS) */}
            <div className="flex items-center space-x-2">
              <div className="bg-slate-950/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-800 text-slate-300 text-[10px] shadow-xl flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FPS: 60 • BUFFER: 100% CACHED (HD)</span>
              </div>
              <div className="bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-emerald-300 font-bold shadow-xl">
                <span>{currentScene.badgeText}</span>
              </div>
            </div>
          </div>

          {/* INTERACTIVE STAGE 06 INSTANT RELEASE MONEY SPLIT TOOLTIP */}
          {currentScene.id === 6 && (
            <div className="absolute bottom-16 right-6 z-30 max-w-xs p-3.5 bg-slate-950/95 backdrop-blur-md border border-emerald-500/40 rounded-2xl shadow-2xl text-left space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 font-bold">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>INSTANT RELEASE MONEY SPLIT</span>
                </span>
                <span className="text-white">£650.00</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg">
                  <span className="text-slate-400 block text-[9px]">OPS REVENUE (85%)</span>
                  <span className="text-emerald-400 font-bold">£1.02</span>
                </div>
                <div className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg">
                  <span className="text-slate-400 block text-[9px]">SELLER REWARD (15%)</span>
                  <span className="text-amber-400 font-bold">£0.18</span>
                </div>
              </div>
            </div>
          )}

          {/* REAL PERSON ANIMATED CURSOR / TOUCH POINTER */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ 
                opacity: 1, 
                x: `${currentScene.targetPos.xPercent}%`, 
                y: `${currentScene.targetPos.yPercent}%`,
                scale: isClicking ? 0.85 : 1
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
            >
              <div className="relative">
                {/* RIPPLE EFFECT ON CLICK */}
                {isClicking && (
                  <motion.div
                    initial={{ scale: 0.3, opacity: 1 }}
                    animate={{ scale: 3.0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -inset-4 rounded-full bg-blue-500/60 border-2 border-white"
                  />
                )}

                {/* HIGH-VISIBILITY CURSOR POINTER */}
                <div className="p-2.5 bg-blue-600 text-white rounded-full shadow-2xl border-2 border-white flex items-center justify-center transform -rotate-12 animate-pulse">
                  <MousePointer className="w-6 h-6 fill-current" />
                </div>
              </div>
            </motion.div>
          )}

          {/* BOTTOM PLAYER CONTROLS BAR */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-slate-950/95 border-t border-slate-800/80 px-4 py-2.5 space-y-2 font-mono text-xs">
            
            {/* SCRUBBER & MILESTONE MARKERS */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{formatTime(currentTime)}</span>
                  <span>/</span>
                  <span>{formatTime(TOTAL_DURATION)}</span>
                </div>
                <span className="text-emerald-400 font-bold uppercase tracking-wide">
                  STAGE {currentScene.id} OF 6: {currentScene.title}
                </span>
              </div>

              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max={TOTAL_DURATION}
                  step="0.05"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none relative z-10"
                />

                {/* VISUAL MILESTONE PROGRESS MARKERS */}
                <div className="relative w-full h-4 mt-1 text-[9px] text-slate-400 flex justify-between pointer-events-none font-mono">
                  <div 
                    onClick={() => jumpToTime(90)}
                    className="absolute left-[50%] -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto hover:text-emerald-400 transition"
                  >
                    <div className="w-1 h-2 bg-emerald-500/60 mb-0.5 rounded-full" />
                    <span>Purchase Verified (90s)</span>
                  </div>

                  <div 
                    onClick={() => jumpToTime(120)}
                    className="absolute left-[66.6%] -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto hover:text-emerald-400 transition"
                  >
                    <div className="w-1 h-2 bg-emerald-400 mb-0.5 rounded-full" />
                    <span className="text-emerald-400 font-bold">Payment Verified & Instant Release (120s)</span>
                  </div>

                  <div 
                    onClick={() => jumpToTime(150)}
                    className="absolute left-[83.3%] -translate-x-1/2 flex flex-col items-center cursor-pointer pointer-events-auto hover:text-emerald-400 transition"
                  >
                    <div className="w-1 h-2 bg-emerald-500/60 mb-0.5 rounded-full" />
                    <span>Order Placed (150s)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PLAY / PAUSE CONTROLS, PLAYBACK SPEED & VOICE STATUS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-900">
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlay}
                  className="px-4 py-1.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold transition cursor-pointer flex items-center space-x-2 text-xs shadow-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlaying ? 'PAUSE VIDEO' : 'PLAY FULL DEMO VIDEO'}</span>
                </button>

                <button
                  onClick={() => {
                    jumpToTime(0);
                    clickTriggeredRef.current = {};
                  }}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
                  title="Reset to Start"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* PLAYBACK SPEED SELECTOR */}
                <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[10px]">
                  {[0.5, 1.0, 1.25, 1.5, 2.0].map(speed => (
                    <button
                      key={`speed-${speed}`}
                      onClick={() => setPlaybackRate(speed)}
                      className={`px-2 py-0.5 rounded-lg font-bold transition cursor-pointer ${
                        playbackRate === speed ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                {/* SYNC AUDIO MANUAL CALIBRATION SLIDER */}
                <div className="flex items-center space-x-1.5 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800 text-[10px]">
                  <span className="text-slate-400 font-bold">AUDIO SYNC:</span>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.1"
                    value={audioSyncOffset}
                    onChange={(e) => setAudioSyncOffset(parseFloat(e.target.value))}
                    className="w-14 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-400"
                    title="Calibrate audio sync offset"
                  />
                  <span className="text-emerald-400 font-bold w-8">{audioSyncOffset > 0 ? `+${audioSyncOffset}` : audioSyncOffset}s</span>
                </div>

                <button
                  onClick={() => {
                    if (voiceoverEnabled) {
                      window.speechSynthesis?.cancel();
                    }
                    setVoiceoverEnabled(!voiceoverEnabled);
                  }}
                  className={`px-3 py-1 rounded-xl border text-[11px] font-mono cursor-pointer transition flex items-center space-x-1.5 ${
                    voiceoverEnabled 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {voiceoverEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>HUMAN VOICE NARRATION: {voiceoverEnabled ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

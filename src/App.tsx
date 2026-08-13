import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { ProductPage } from './components/ProductPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { IntegratePage } from './components/IntegratePage';
import { SecurityPage } from './components/SecurityPage';
import { CheckoutPage } from './components/CheckoutPage';
import { OpsDashboard } from './components/OpsDashboard';
import { DemoVideoPage } from './components/DemoVideoPage';
import { RevenueFlowWalkthrough } from './components/RevenueFlowWalkthrough';
import { CreateTransactionModal } from './components/CreateTransactionModal';
import { UniversalOverlayWidget } from './components/UniversalOverlayWidget';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { ReceiptAnalyzerModal } from './components/ReceiptAnalyzerModal';
import { QRScannerModal } from './components/QRScannerModal';

import { StorefrontPage } from './components/StorefrontPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    try {
      const raw = window.location.pathname || '/';
      return raw.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    } catch {
      return '/';
    }
  });
  const [isCreateTxModalOpen, setIsCreateTxModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrData, setQrData] = useState<{ itemTitle?: string; itemPrice?: number; sellerName?: string } | undefined>(undefined);

  // Sync route with browser history
  const navigate = (path: string) => {
    const cleanPath = path.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    try {
      window.history.pushState({}, '', cleanPath);
    } catch (err) {
      console.warn('Browser pushState restricted in iframe, using local route state:', err);
    }
    setCurrentRoute(cleanPath);
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      try {
        const raw = window.location.pathname || '/';
        const clean = raw.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
        setCurrentRoute(clean);
      } catch {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route matching helper
  const renderRoute = () => {
    const route = (currentRoute || '/').replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';

    if (route === '/product' || route === '/about') {
      return <ProductPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} />;
    }
    if (route === '/how-it-works' || route === '/pricing') {
      return <HowItWorksPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} initialTab={route === '/pricing' ? 'pricing' : 'how-it-works'} />;
    }
    if (route === '/integrate' || route === '/developers' || route === '/api') {
      return <IntegratePage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} initialTab={route === '/developers' || route === '/api' ? 'developers' : 'integrations'} />;
    }
    if (route === '/security') {
      return <SecurityPage />;
    }
    if (route === '/dashboard' || route === '/ops') {
      return (
        <OpsDashboard
          navigate={navigate}
          onOpenNotifications={() => setIsNotificationModalOpen(true)}
          onOpenReceiptAnalyzer={() => setIsReceiptModalOpen(true)}
          onOpenQRScanner={() => setIsQRModalOpen(true)}
        />
      );
    }
    if (route === '/demo' || route === '/video' || route === '/demo-video') {
      return <DemoVideoPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} />;
    }
    if (route === '/revenue-flow' || route === '/revenue' || route === '/monetization' || route === '/how-we-make-money') {
      return <RevenueFlowWalkthrough navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} />;
    }
    if (route === '/store' || route.startsWith('/store/')) {
      const storeId = route.startsWith('/store/') ? route.replace('/store/', '') : 'techworld_store';
      return <StorefrontPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} storeId={storeId} />;
    }

    // Dynamic Checkout Route: /pay/:txId
    if (route.startsWith('/pay/')) {
      const txId = route.replace('/pay/', '').trim() || 'AR-DEMO-001';
      return <CheckoutPage transactionId={txId} navigate={navigate} />;
    }

    // Default Landing Page
    return (
      <LandingPage
        navigate={navigate}
        onOpenCreateTx={() => setIsCreateTxModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        navigate={navigate}
        onOpenCreateTx={() => setIsCreateTxModalOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Footer */}
      <Footer navigate={navigate} />

      {/* Modals & Universal Overlay */}
      <UniversalOverlayWidget
        onOpenCreateTx={() => setIsCreateTxModalOpen(true)}
        navigate={navigate}
      />

      <CreateTransactionModal
        isOpen={isCreateTxModalOpen}
        onClose={() => setIsCreateTxModalOpen(false)}
        navigate={navigate}
        initialData={qrData}
      />

      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />

      <ReceiptAnalyzerModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
      />

      <QRScannerModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onScanSuccess={(scanned) => {
          setQrData(scanned);
          setIsCreateTxModalOpen(true);
        }}
      />

    </div>
  );
}

export default App;

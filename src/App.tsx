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
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname);
  const [isCreateTxModalOpen, setIsCreateTxModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrData, setQrData] = useState<{ itemTitle?: string; itemPrice?: number; sellerName?: string } | undefined>(undefined);

  // Sync route with browser history
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route matching helper
  const renderRoute = () => {
    if (currentRoute === '/product' || currentRoute === '/about') {
      return <ProductPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} />;
    }
    if (currentRoute === '/how-it-works' || currentRoute === '/pricing') {
      return <HowItWorksPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} initialTab={currentRoute === '/pricing' ? 'pricing' : 'how-it-works'} />;
    }
    if (currentRoute === '/integrate' || currentRoute === '/developers' || currentRoute === '/api') {
      return <IntegratePage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} initialTab={currentRoute === '/developers' || currentRoute === '/api' ? 'developers' : 'integrations'} />;
    }
    if (currentRoute === '/security') {
      return <SecurityPage />;
    }
    if (currentRoute === '/dashboard' || currentRoute === '/ops') {
      return (
        <OpsDashboard
          navigate={navigate}
          onOpenNotifications={() => setIsNotificationModalOpen(true)}
          onOpenReceiptAnalyzer={() => setIsReceiptModalOpen(true)}
          onOpenQRScanner={() => setIsQRModalOpen(true)}
        />
      );
    }
    if (currentRoute === '/demo' || currentRoute === '/video' || currentRoute === '/demo-video') {
      return <DemoVideoPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} />;
    }
    if (currentRoute === '/revenue-flow' || currentRoute === '/revenue' || currentRoute === '/monetization' || currentRoute === '/how-we-make-money') {
      return <RevenueFlowWalkthrough navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} />;
    }
    if (currentRoute === '/store' || currentRoute.startsWith('/store/')) {
      const storeId = currentRoute.startsWith('/store/') ? currentRoute.replace('/store/', '') : 'techworld_store';
      return <StorefrontPage navigate={navigate} onOpenCreateTx={() => setIsCreateTxModalOpen(true)} storeId={storeId} />;
    }

    // Dynamic Checkout Route: /pay/:txId
    if (currentRoute.startsWith('/pay/')) {
      const txId = currentRoute.replace('/pay/', '');
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

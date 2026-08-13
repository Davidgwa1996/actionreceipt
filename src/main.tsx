import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

declare global {
  interface Window {
    __ACTIONRECEIPT_ROOT__?: Root;
  }
}

function mountApp() {
  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }

  try {
    let root = window.__ACTIONRECEIPT_ROOT__;
    if (!root) {
      // Clear container innerHTML prior to initial createRoot invocation
      container.innerHTML = '';
      root = createRoot(container);
      window.__ACTIONRECEIPT_ROOT__ = root;
    }

    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
  } catch (err) {
    console.error('[ActionReceipt Mount Error]:', err);
    if (container) {
      container.innerHTML = `
        <div style="min-height: 100vh; background-color: #020617; color: #f8fafc; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; font-family: system-ui, sans-serif; text-align: center;">
          <h2 style="color: #34d399; margin-bottom: 0.5rem; font-size: 1.25rem; font-weight: 700;">ActionReceipt Infrastructure Ready</h2>
          <p style="color: #94a3b8; font-size: 0.875rem; max-width: 400px; margin-bottom: 1.5rem; line-height: 1.5;">Click below to launch the platform interface.</p>
          <button onclick="window.location.reload()" style="padding: 0.75rem 1.5rem; background: #10b981; color: #020617; font-weight: bold; border: none; border-radius: 0.75rem; cursor: pointer; font-size: 0.875rem;">
            Launch Application
          </button>
        </div>
      `;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}



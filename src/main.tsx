import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Send GA4 page_view on SPA navigations
function initRouteChangeTracking() {
  if (typeof window === 'undefined') return;
  const sendPageView = () => {
    // @ts-ignore
    if (window.gtag) {
      // @ts-ignore
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
      });
    }
  };

  // Initial
  sendPageView();

  // Track pushState/replaceState and popstate
  const pushState = history.pushState;
  history.pushState = function (...args) {
    // @ts-ignore
    const ret = pushState.apply(this, args as any);
    sendPageView();
    return ret;
  } as any;

  const replaceState = history.replaceState;
  history.replaceState = function (...args) {
    // @ts-ignore
    const ret = replaceState.apply(this, args as any);
    sendPageView();
    return ret;
  } as any;

  window.addEventListener('popstate', sendPageView);
}

initRouteChangeTracking();

createRoot(document.getElementById("root")!).render(<App />);

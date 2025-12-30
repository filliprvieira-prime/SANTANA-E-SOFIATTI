import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDosE4j0XTnqwVqDEgnLenjO8mcy9vUYxs",
  authDomain: "santana-sofiatti.firebaseapp.com",
  projectId: "santana-sofiatti",
  storageBucket: "santana-sofiatti.firebasestorage.app",
  messagingSenderId: "972970796460",
  appId: "1:972970796460:web:9b087368dc0db459268609",
  measurementId: "G-Z0W8HLCP3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
let analytics: any = null;

// Analytics só funciona no browser
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Funções para rastreamento de eventos
export const trackPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
};

export const trackEvent = (eventName: string, eventParams?: any) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

export const trackWhatsAppClick = () => {
  if (analytics) {
    logEvent(analytics, 'contact_whatsapp', {
      method: 'whatsapp_button'
    });
  }
};

export const trackFormSubmit = (formName: string) => {
  if (analytics) {
    logEvent(analytics, 'form_submit', {
      form_name: formName
    });
  }
};

export const trackFloorPlanView = (planName: string) => {
  if (analytics) {
    logEvent(analytics, 'view_floor_plan', {
      plan_name: planName
    });
  }
};

export const trackGalleryView = (imageName: string) => {
  if (analytics) {
    logEvent(analytics, 'view_gallery_image', {
      image_name: imageName
    });
  }
};

export { app, analytics };

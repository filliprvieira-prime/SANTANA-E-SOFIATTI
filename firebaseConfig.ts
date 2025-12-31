import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

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

// Initialize Firestore
let db: any = null;

// Analytics e Firestore só funcionam no browser
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    db = getFirestore(app);
    console.log('✅ Firebase inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', error);
  }
}

// ==========================================
// SISTEMA DE CÓDIGO ÚNICO PARA RASTREAMENTO
// ==========================================

// Gera código curto tipo "A3B7X2" (6 caracteres alfanuméricos)
const generateLeadCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Sem I, O, 0, 1 para evitar confusão
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// ==========================================
// SISTEMA DE RASTREAMENTO DE SESSÃO
// ==========================================

interface TimeTracker {
  [key: string]: number;
}

// Interface para eventos da timeline
interface TimelineEvent {
  timestamp: number;
  action: string;
  details?: string;
  section?: string;
}

// Interface para dados do visitante (persistente entre sessões)
interface VisitorData {
visitorId: string;
  firstVisit: number;
  visitCount: number;
  lastVisit: number;
  leadCode: string;
}

interface SessionData {
  sessionId: string;
  leadCode: string; // CÓDIGO ÚNICO para identificar o lead
  startTime: number;
  
  pagesViewed: string[];
  navigationClicks: string[];
  leisureItemsClicked: string[];
  
  floorPlanTimeSpent: TimeTracker;
  currentFloorPlan: string | null;
  floorPlanStartTime: number | null;
  
  galleryImageTimeSpent: TimeTracker;
  currentGalleryImage: string | null;
  galleryImageStartTime: number | null;
  
  facadeImageTimeSpent: TimeTracker;
  currentFacadeImage: string | null;
  facadeImageStartTime: number | null;
  
  totalTimeOnSite: number;
  whatsappClicks: number;
  
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  
  device: string;
  browser: string;
  screenSize: string;
  
  // Novos campos
  timeline: TimelineEvent[];
  visitorId: string;
}

const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let device = 'desktop';
  if (/Mobile|Android|iPhone|iPad/.test(ua)) {
    device = /iPad/.test(ua) ? 'tablet' : 'mobile';
  }
  
  let browser = 'unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';
  
  return { device, browser };
};

const getUTMParams = () => {
  if (typeof window === 'undefined') return { utmSource: null, utmMedium: null, utmCampaign: null };
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  };
};

let currentSession: SessionData | null = null;

// Gerar ou obter ID do visitante (persistente)
const getOrCreateVisitorId = (): string => {
  if (typeof window === 'undefined') return '';
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

// Gerenciar dados do visitante (contador de visitas)
const getVisitorData = (): VisitorData => {
  if (typeof window === 'undefined') {
    return { visitorId: '', firstVisit: Date.now(), visitCount: 0, lastVisit: Date.now(), leadCode: '' };
  }
  const saved = localStorage.getItem('visitorData');
  if (saved) {
    return JSON.parse(saved);
  }
  return { visitorId: '', firstVisit: Date.now(), visitCount: 0, lastVisit: Date.now(), leadCode: '' };
};

const updateVisitorData = (): VisitorData => {
  if (typeof window === 'undefined') {
    return { visitorId: '', firstVisit: Date.now(), visitCount: 0, lastVisit: Date.now(), leadCode: '' };
  }
  
  const visitorId = getOrCreateVisitorId();
  let visitorData = getVisitorData();
  
  // Se é primeira visita ou visitante novo
  if (!visitorData.visitorId || visitorData.visitorId !== visitorId) {
    visitorData = {
      visitorId,
      firstVisit: Date.now(),
      visitCount: 1,
      lastVisit: Date.now(),
      leadCode: generateLeadCode()
    };
  } else {
    // Visitante recorrente - só incrementa se última visita foi há mais de 30 min
    const thirtyMinutes = 30 * 60 * 1000;
    if (Date.now() - visitorData.lastVisit > thirtyMinutes) {
      visitorData.visitCount += 1;
    }
    visitorData.lastVisit = Date.now();
  }
  
  localStorage.setItem('visitorData', JSON.stringify(visitorData));
  return visitorData;
};

// Obter contador de visitas
export const getVisitCount = (): number => {
  const visitorData = getVisitorData();
  return visitorData.visitCount || 1;
};

// Verificar se é visitante recorrente
export const isReturningVisitor = (): boolean => {
  return getVisitCount() > 1;
};

// Obter dados completos do visitante
export const getVisitorInfo = (): { visitCount: number; firstVisit: number; isReturning: boolean } => {
  const visitorData = getVisitorData();
  return {
    visitCount: visitorData.visitCount || 1,
    firstVisit: visitorData.firstVisit || Date.now(),
    isReturning: (visitorData.visitCount || 1) > 1
  };
};

const initSession = () => {
  if (typeof window === 'undefined') return;
  
  const { device, browser } = getDeviceInfo();
  const utm = getUTMParams();
  const visitorData = updateVisitorData();
  
  currentSession = {
    sessionId: generateSessionId(),
    leadCode: visitorData.leadCode || generateLeadCode(),
    visitorId: visitorData.visitorId,
    startTime: Date.now(),
    pagesViewed: [],
    navigationClicks: [],
    leisureItemsClicked: [],
    
    floorPlanTimeSpent: {},
    currentFloorPlan: null,
    floorPlanStartTime: null,
    
    galleryImageTimeSpent: {},
    currentGalleryImage: null,
    galleryImageStartTime: null,
    
    facadeImageTimeSpent: {},
    currentFacadeImage: null,
    facadeImageStartTime: null,
    
    totalTimeOnSite: 0,
    whatsappClicks: 0,
    referrer: document.referrer || 'direct',
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    device,
    browser,
    screenSize: `${window.innerWidth}x${window.innerHeight}`,
    
    timeline: [{
      timestamp: Date.now(),
      action: 'session_start',
      details: `Visita #${visitorData.visitCount}`,
      section: 'site'
    }],
  };
  
  localStorage.setItem('leadSession', JSON.stringify(currentSession));
  console.log('🆕 Nova sessão criada:', currentSession.leadCode, '| Visita #' + visitorData.visitCount);
};

const getSession = (): SessionData => {
  if (typeof window === 'undefined') {
    return {
      sessionId: '',
      leadCode: '',
      visitorId: '',
      startTime: Date.now(),
      pagesViewed: [],
      navigationClicks: [],
      leisureItemsClicked: [],
      floorPlanTimeSpent: {},
      currentFloorPlan: null,
      floorPlanStartTime: null,
      galleryImageTimeSpent: {},
      currentGalleryImage: null,
      galleryImageStartTime: null,
      facadeImageTimeSpent: {},
      currentFacadeImage: null,
      facadeImageStartTime: null,
      totalTimeOnSite: 0,
      whatsappClicks: 0,
      referrer: '',
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      device: '',
      browser: '',
      screenSize: '',
      timeline: [],
    };
  }
  
  if (!currentSession) {
    const saved = localStorage.getItem('leadSession');
    if (saved) {
      try {
        currentSession = JSON.parse(saved);
        // Se sessão tem mais de 30 minutos, criar nova
        if (Date.now() - currentSession!.startTime > 30 * 60 * 1000) {
          initSession();
        }
        // Se sessão antiga não tem leadCode, gerar um
        if (!currentSession!.leadCode) {
          currentSession!.leadCode = generateLeadCode();
          localStorage.setItem('leadSession', JSON.stringify(currentSession));
          console.log('🔄 Código gerado para sessão existente:', currentSession!.leadCode);
        }
        // Se sessão antiga não tem timeline, criar vazia
        if (!currentSession!.timeline) {
          currentSession!.timeline = [];
          localStorage.setItem('leadSession', JSON.stringify(currentSession));
        }
        // Se sessão antiga não tem visitorId
        if (!currentSession!.visitorId) {
          currentSession!.visitorId = getOrCreateVisitorId();
          localStorage.setItem('leadSession', JSON.stringify(currentSession));
        }
      } catch (e) {
        initSession();
      }
    } else {
      initSession();
    }
  }
  
  return currentSession!;
};

const updateSession = (updates: Partial<SessionData>) => {
  const session = getSession();
  Object.assign(session, updates);
  session.totalTimeOnSite = Math.round((Date.now() - session.startTime) / 1000);
  localStorage.setItem('leadSession', JSON.stringify(session));
};

const addToSessionArray = (key: keyof SessionData, value: string) => {
  const session = getSession();
  const arr = session[key] as string[];
  if (arr && Array.isArray(arr) && !arr.includes(value)) {
    arr.push(value);
    updateSession({ [key]: arr });
  }
};

// Adicionar evento na timeline
const addTimelineEvent = (action: string, details?: string, section?: string) => {
  const session = getSession();
  const timeline = session.timeline || [];
  
  timeline.push({
    timestamp: Date.now(),
    action,
    details,
    section
  });
  
  // Limitar timeline a 100 eventos mais recentes
  if (timeline.length > 100) {
    timeline.shift();
  }
  
  updateSession({ timeline });
};

// Obter timeline formatada
export const getTimeline = (): TimelineEvent[] => {
  const session = getSession();
  return session.timeline || [];
};

// ==========================================
// FUNÇÕES DE TIMER
// ==========================================

const finishCurrentTimer = (
  currentKey: 'currentFloorPlan' | 'currentGalleryImage' | 'currentFacadeImage',
  startTimeKey: 'floorPlanStartTime' | 'galleryImageStartTime' | 'facadeImageStartTime',
  timeSpentKey: 'floorPlanTimeSpent' | 'galleryImageTimeSpent' | 'facadeImageTimeSpent'
) => {
  const session = getSession();
  const currentItem = session[currentKey];
  const startTime = session[startTimeKey];
  
  if (currentItem && startTime) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const timeTracker = (session[timeSpentKey] || {}) as TimeTracker;
    timeTracker[currentItem] = (timeTracker[currentItem] || 0) + timeSpent;
    
    updateSession({
      [timeSpentKey]: timeTracker,
      [currentKey]: null,
      [startTimeKey]: null,
    });
  }
};

export const startFloorPlanTimer = (planName: string) => {
  finishCurrentTimer('currentFloorPlan', 'floorPlanStartTime', 'floorPlanTimeSpent');
  updateSession({
    currentFloorPlan: planName,
    floorPlanStartTime: Date.now(),
  });
};

export const stopFloorPlanTimer = () => {
  finishCurrentTimer('currentFloorPlan', 'floorPlanStartTime', 'floorPlanTimeSpent');
};

export const startGalleryImageTimer = (imageName: string) => {
  finishCurrentTimer('currentGalleryImage', 'galleryImageStartTime', 'galleryImageTimeSpent');
  updateSession({
    currentGalleryImage: imageName,
    galleryImageStartTime: Date.now(),
  });
};

export const stopGalleryImageTimer = () => {
  finishCurrentTimer('currentGalleryImage', 'galleryImageStartTime', 'galleryImageTimeSpent');
};

export const startFacadeImageTimer = (imageName: string) => {
  finishCurrentTimer('currentFacadeImage', 'facadeImageStartTime', 'facadeImageTimeSpent');
  updateSession({
    currentFacadeImage: imageName,
    facadeImageStartTime: Date.now(),
  });
};

export const stopFacadeImageTimer = () => {
  finishCurrentTimer('currentFacadeImage', 'facadeImageStartTime', 'facadeImageTimeSpent');
};

// ==========================================
// SALVAR LEAD NO FIRESTORE
// ==========================================

const findMostViewedItem = (timeTracker: TimeTracker | undefined | null): { item: string; time: number } | null => {
  if (!timeTracker || typeof timeTracker !== 'object') return null;
  const entries = Object.entries(timeTracker);
  if (entries.length === 0) return null;
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  return { item: sorted[0][0], time: sorted[0][1] };
};

const formatTime = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return '0 segundos';
  if (seconds < 60) return `${seconds} segundos`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}min ${secs}s`;
};

const formatTimeTracker = (tracker: TimeTracker | undefined | null): { [key: string]: string } => {
  const formatted: { [key: string]: string } = {};
  if (!tracker || typeof tracker !== 'object') return formatted;
  for (const [key, value] of Object.entries(tracker)) {
    formatted[key] = formatTime(value);
  }
  return formatted;
};

const calculateInterestScore = (session: SessionData): number => {
  let score = 0;
  score += Math.min((session.totalTimeOnSite || 0) / 10, 30);
  
  const floorPlanValues = session.floorPlanTimeSpent ? Object.values(session.floorPlanTimeSpent) : [];
  const totalFloorPlanTime = floorPlanValues.length > 0 ? floorPlanValues.reduce((a, b) => a + b, 0) : 0;
  score += Math.min(totalFloorPlanTime / 5, 25);
  
  const galleryValues = session.galleryImageTimeSpent ? Object.values(session.galleryImageTimeSpent) : [];
  const totalGalleryTime = galleryValues.length > 0 ? galleryValues.reduce((a, b) => a + b, 0) : 0;
  score += Math.min(totalGalleryTime / 3, 15);
  
  score += Math.min((session.leisureItemsClicked?.length || 0) * 3, 15);
  score += Math.min((session.whatsappClicks || 0) * 15, 15);
  
  return Math.min(Math.round(score), 100);
};

export const saveLeadToFirestore = async (triggerAction: string): Promise<string | null> => {
  console.log('🔄 Iniciando salvamento do lead...');
  
  if (!db) {
    console.error('❌ Firestore não inicializado');
    return null;
  }
  
  // Finaliza todos os timers ativos
  finishCurrentTimer('currentFloorPlan', 'floorPlanStartTime', 'floorPlanTimeSpent');
  finishCurrentTimer('currentGalleryImage', 'galleryImageStartTime', 'galleryImageTimeSpent');
  finishCurrentTimer('currentFacadeImage', 'facadeImageStartTime', 'facadeImageTimeSpent');
  
  const session = getSession();
  session.totalTimeOnSite = Math.round((Date.now() - session.startTime) / 1000);
  
  const mostViewedFloorPlan = findMostViewedItem(session.floorPlanTimeSpent);
  const mostViewedGalleryImage = findMostViewedItem(session.galleryImageTimeSpent);
  const mostViewedFacadeImage = findMostViewedItem(session.facadeImageTimeSpent);
  
  try {
    const leadData = {
      // 🔑 CÓDIGO ÚNICO - o mais importante!
      leadCode: session.leadCode,
      
      sessionId: session.sessionId,
      startTime: session.startTime,
      totalTimeOnSite: session.totalTimeOnSite,
      totalTimeFormatted: formatTime(session.totalTimeOnSite),
      
      pagesViewed: session.pagesViewed || [],
      navigationClicks: session.navigationClicks || [],
      leisureItemsClicked: session.leisureItemsClicked || [],
      
      floorPlanTimeSpent: session.floorPlanTimeSpent || {},
      floorPlanTimeFormatted: formatTimeTracker(session.floorPlanTimeSpent),
      plantaMaisVista: mostViewedFloorPlan ? {
        nome: mostViewedFloorPlan.item,
        tempoSegundos: mostViewedFloorPlan.time,
        tempoFormatado: formatTime(mostViewedFloorPlan.time),
      } : null,
      
      galleryImageTimeSpent: session.galleryImageTimeSpent || {},
      galleryTimeFormatted: formatTimeTracker(session.galleryImageTimeSpent),
      fotoMaisVista: mostViewedGalleryImage ? {
        nome: mostViewedGalleryImage.item,
        tempoSegundos: mostViewedGalleryImage.time,
        tempoFormatado: formatTime(mostViewedGalleryImage.time),
      } : null,
      
      facadeImageTimeSpent: session.facadeImageTimeSpent || {},
      fachadaMaisVista: mostViewedFacadeImage ? {
        nome: mostViewedFacadeImage.item,
        tempoSegundos: mostViewedFacadeImage.time,
        tempoFormatado: formatTime(mostViewedFacadeImage.time),
      } : null,
      
      whatsappClicks: session.whatsappClicks || 0,
      
      referrer: session.referrer || 'direct',
      utmSource: session.utmSource,
      utmMedium: session.utmMedium,
      utmCampaign: session.utmCampaign,
      
      device: session.device,
      browser: session.browser,
      screenSize: session.screenSize,
      
      // Novos campos: Timeline e Visitante
      timeline: session.timeline || [],
      visitorId: session.visitorId || '',
      visitCount: getVisitCount(),
      isReturningVisitor: isReturningVisitor(),
      
      triggerAction,
      savedAt: serverTimestamp(),
      
      resumo: {
        codigo: session.leadCode,
        tempoTotal: formatTime(session.totalTimeOnSite),
        plantaPreferida: mostViewedFloorPlan ? `${mostViewedFloorPlan.item} (${formatTime(mostViewedFloorPlan.time)})` : 'Nenhuma',
        fotoPreferida: mostViewedGalleryImage ? `${mostViewedGalleryImage.item} (${formatTime(mostViewedGalleryImage.time)})` : 'Nenhuma',
        interesseEmLazer: (session.leisureItemsClicked?.length || 0) > 0 ? session.leisureItemsClicked.join(', ') : 'Não clicou',
        nivelInteresse: calculateInterestScore(session),
        origem: session.utmSource || session.referrer || 'Acesso direto',
        totalVisitas: getVisitCount(),
        visitanteRecorrente: isReturningVisitor() ? 'Sim' : 'Não',
      }
    };
    
    console.log('📤 Enviando dados para Firestore:', leadData.leadCode);
    const docRef = await addDoc(collection(db, 'leads'), leadData);
    console.log('✅ Lead salvo com sucesso! ID:', docRef.id, '| Código:', session.leadCode);
    
    return session.leadCode;
  } catch (error) {
    console.error('❌ Erro ao salvar lead:', error);
    return null;
  }
};

// Retorna o código do lead atual
export const getLeadCode = (): string => {
  const session = getSession();
  return session.leadCode;
};

// Salvar lead com dados do formulário (nome e telefone)
export const saveLeadWithFormData = async (formData: { name: string; phone: string }): Promise<string | null> => {
  console.log('🔄 Salvando lead com dados do formulário...');
  
  if (!db) {
    console.error('❌ Firestore não inicializado');
    return null;
  }
  
  // Finaliza todos os timers ativos
  finishCurrentTimer('currentFloorPlan', 'floorPlanStartTime', 'floorPlanTimeSpent');
  finishCurrentTimer('currentGalleryImage', 'galleryImageStartTime', 'galleryImageTimeSpent');
  finishCurrentTimer('currentFacadeImage', 'facadeImageStartTime', 'facadeImageTimeSpent');
  
  const session = getSession();
  session.totalTimeOnSite = Math.round((Date.now() - session.startTime) / 1000);
  
  const mostViewedFloorPlan = findMostViewedItem(session.floorPlanTimeSpent);
  const mostViewedGalleryImage = findMostViewedItem(session.galleryImageTimeSpent);
  const mostViewedFacadeImage = findMostViewedItem(session.facadeImageTimeSpent);
  
  try {
    const leadData = {
      // 🔑 CÓDIGO ÚNICO
      leadCode: session.leadCode,
      
      // 📝 DADOS DO FORMULÁRIO
      nomeCliente: formData.name,
      telefoneCliente: formData.phone,
      
      sessionId: session.sessionId,
      startTime: session.startTime,
      totalTimeOnSite: session.totalTimeOnSite,
      totalTimeFormatted: formatTime(session.totalTimeOnSite),
      
      pagesViewed: session.pagesViewed || [],
      navigationClicks: session.navigationClicks || [],
      leisureItemsClicked: session.leisureItemsClicked || [],
      
      floorPlanTimeSpent: session.floorPlanTimeSpent || {},
      floorPlanTimeFormatted: formatTimeTracker(session.floorPlanTimeSpent),
      plantaMaisVista: mostViewedFloorPlan ? {
        nome: mostViewedFloorPlan.item,
        tempoSegundos: mostViewedFloorPlan.time,
        tempoFormatado: formatTime(mostViewedFloorPlan.time),
      } : null,
      
      galleryImageTimeSpent: session.galleryImageTimeSpent || {},
      galleryTimeFormatted: formatTimeTracker(session.galleryImageTimeSpent),
      fotoMaisVista: mostViewedGalleryImage ? {
        nome: mostViewedGalleryImage.item,
        tempoSegundos: mostViewedGalleryImage.time,
        tempoFormatado: formatTime(mostViewedGalleryImage.time),
      } : null,
      
      facadeImageTimeSpent: session.facadeImageTimeSpent || {},
      fachadaMaisVista: mostViewedFacadeImage ? {
        nome: mostViewedFacadeImage.item,
        tempoSegundos: mostViewedFacadeImage.time,
        tempoFormatado: formatTime(mostViewedFacadeImage.time),
      } : null,
      
      whatsappClicks: session.whatsappClicks || 0,
      
      referrer: session.referrer || 'direct',
      utmSource: session.utmSource,
      utmMedium: session.utmMedium,
      utmCampaign: session.utmCampaign,
      
      device: session.device,
      browser: session.browser,
      screenSize: session.screenSize,
      
      // Novos campos: Timeline e Visitante
      timeline: session.timeline || [],
      visitorId: session.visitorId || '',
      visitCount: getVisitCount(),
      isReturningVisitor: isReturningVisitor(),
      
      triggerAction: 'form_solicitar_contato',
      savedAt: serverTimestamp(),
      
      resumo: {
        codigo: session.leadCode,
        nome: formData.name,
        telefone: formData.phone,
        tempoTotal: formatTime(session.totalTimeOnSite),
        plantaPreferida: mostViewedFloorPlan ? `${mostViewedFloorPlan.item} (${formatTime(mostViewedFloorPlan.time)})` : 'Nenhuma',
        fotoPreferida: mostViewedGalleryImage ? `${mostViewedGalleryImage.item} (${formatTime(mostViewedGalleryImage.time)})` : 'Nenhuma',
        interesseEmLazer: (session.leisureItemsClicked?.length || 0) > 0 ? session.leisureItemsClicked.join(', ') : 'Não clicou',
        nivelInteresse: calculateInterestScore(session),
        origem: session.utmSource || session.referrer || 'Acesso direto',
        totalVisitas: getVisitCount(),
        visitanteRecorrente: isReturningVisitor() ? 'Sim' : 'Não',
      }
    };
    
    console.log('📤 Enviando dados do formulário para Firestore:', leadData.leadCode);
    const docRef = await addDoc(collection(db, 'leads'), leadData);
    console.log('✅ Lead com formulário salvo! ID:', docRef.id, '| Código:', session.leadCode);
    
    return session.leadCode;
  } catch (error) {
    console.error('❌ Erro ao salvar lead com formulário:', error);
    return null;
  }
};

// Inicializar sessão quando o módulo carrega
if (typeof window !== 'undefined') {
  getSession();
}

// ==========================================
// FUNÇÕES DE RASTREAMENTO
// ==========================================

export const trackPageView = (pageName: string) => {
  addToSessionArray('pagesViewed', pageName);
  addTimelineEvent('page_view', pageName, 'navegação');
  
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

export const trackWhatsAppClick = async (location?: string): Promise<string | null> => {
  const session = getSession();
  session.whatsappClicks = (session.whatsappClicks || 0) + 1;
  updateSession({ whatsappClicks: session.whatsappClicks });
  addTimelineEvent('whatsapp_click', location || 'botão principal', 'contato');
  
  // Salvar lead e retornar o código
  const leadCode = await saveLeadToFirestore(`whatsapp_click_${location || 'unknown'}`);
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: 'WhatsApp Contact',
      content_category: 'Real Estate',
      value: 1,
      currency: 'BRL'
    });
  }
  
  if (analytics) {
    logEvent(analytics, 'contact_whatsapp', {
      method: 'whatsapp_button',
      location: location || 'unknown',
      lead_code: leadCode
    });
  }
  
  return leadCode;
};

export const trackFormSubmit = async (formName: string) => {
  addTimelineEvent('form_submit', formName, 'formulário');
  await saveLeadToFirestore(`form_submit_${formName}`);
  
  if (analytics) {
    logEvent(analytics, 'form_submit', { form_name: formName });
  }
};

export const trackFloorPlanView = (planName: string) => {
  startFloorPlanTimer(planName);
  addTimelineEvent('floor_plan_view', planName, 'plantas');
  
  if (analytics) {
    logEvent(analytics, 'view_floor_plan', { plan_name: planName });
  }
};

export const trackGalleryView = (imageName: string) => {
  startGalleryImageTimer(imageName);
  addTimelineEvent('gallery_view', imageName, 'galeria');
  
  if (analytics) {
    logEvent(analytics, 'view_gallery_image', { image_name: imageName });
  }
};

export const trackLeisureItemClick = (itemName: string) => {
  addToSessionArray('leisureItemsClicked', itemName);
  addTimelineEvent('leisure_click', itemName, 'lazer');
  
  if (analytics) {
    logEvent(analytics, 'click_leisure_item', { item_name: itemName });
  }
};

export const trackNavigationClick = (sectionName: string) => {
  addToSessionArray('navigationClicks', sectionName);
  addTimelineEvent('navigation_click', sectionName, 'navegação');
  
  if (analytics) {
    logEvent(analytics, 'navigation_click', { section: sectionName });
  }
};

export const trackImageView = (imageType: string, imageName: string) => {
  startFacadeImageTimer(imageName);
  addTimelineEvent('image_view', `${imageType}: ${imageName}`, 'imagens');
  
  if (analytics) {
    logEvent(analytics, 'view_image', { image_type: imageType, image_name: imageName });
  }
};

// Novo: rastrear abertura de lightbox
export const trackLightboxOpen = (imageType: string, imageName: string) => {
  addTimelineEvent('lightbox_open', `${imageType}: ${imageName}`, 'lightbox');
  
  if (analytics) {
    logEvent(analytics, 'lightbox_open', { image_type: imageType, image_name: imageName });
  }
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  addTimelineEvent('button_click', buttonName, location || 'geral');
  
  if (analytics) {
    logEvent(analytics, 'button_click', { button_name: buttonName, location: location || 'unknown' });
  }
};

export const trackSectionView = (sectionName: string) => {
  addTimelineEvent('section_view', sectionName, 'navegação');
  
  if (analytics) {
    logEvent(analytics, 'section_view', { section_name: sectionName });
  }
};

export const trackFormFieldInteraction = (fieldName: string) => {
  addTimelineEvent('form_field', fieldName, 'formulário');
  
  if (analytics) {
    logEvent(analytics, 'form_field_interaction', { field_name: fieldName });
  }
};

export const trackStoreClick = (storeName: string, storeLocation: string) => {
  addTimelineEvent('store_click', `${storeName} (${storeLocation})`, 'parceiros');
  
  if (analytics) {
    logEvent(analytics, 'store_click', { store_name: storeName, store_location: storeLocation });
  }
};

// ==========================================
// BUSCAR LEADS (para painel admin)
// ==========================================

export const searchLeadsByCode = async (code: string) => {
  if (!db) return [];
  
  try {
    const cleanCode = code.toUpperCase().trim();
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, where('leadCode', '==', cleanCode));
    
    const snapshot = await getDocs(q);
    const leads: any[] = [];
    
    snapshot.forEach((doc) => {
      leads.push({ id: doc.id, ...doc.data() });
    });
    
    return leads;
  } catch (error) {
    console.error('Erro ao buscar por código:', error);
    return [];
  }
};

export const getRecentLeads = async (limitCount: number = 50) => {
  if (!db) return [];
  
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('savedAt', 'desc'));
    
    const snapshot = await getDocs(q);
    const leads: any[] = [];
    
    snapshot.forEach((doc) => {
      if (leads.length < limitCount) {
        leads.push({ id: doc.id, ...doc.data() });
      }
    });
    
    return leads;
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    return [];
  }
};

// Busca antiga por telefone (mantida por compatibilidade)
export const searchLeadsByPhone = async (phone: string) => {
  return [];
};

export { app, analytics, db };

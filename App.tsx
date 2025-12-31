
import React, { useState, useEffect } from 'react';
import { 
  DESIGN_SYSTEM,
  HERO_CONTENT, 
  ABOUT_CONTENT, 
  LEISURE_ITEMS, 
  FLOOR_PLANS, 
  LOCATION_POINTS, 
  CONTACT_INFO,
  NAV_LINKS,
  SITE_METADATA,
  GALLERY_ITEMS,
  FOOTER_CONTENT,
  FORM_CONTENT,
  HIGHLIGHT_IMAGE_ID,
  LOCATION_IMAGE_ID,
  PRIME_AGENCY_DATA,
  getDriveImageUrl 
} from './constants';
import { 
  trackPageView, 
  trackWhatsAppClick, 
  trackFormSubmit, 
  trackFloorPlanView, 
  trackEvent, 
  trackGalleryView, 
  trackLeisureItemClick, 
  trackNavigationClick, 
  trackImageView,
  trackButtonClick,
  trackFormFieldInteraction,
  trackStoreClick,
  getRecentLeads,
  searchLeadsByCode,
  stopFloorPlanTimer,
  stopGalleryImageTimer,
  getLeadCode,
  saveLeadWithFormData,
  trackLightboxOpen,
  getTimeline,
  getVisitorInfo
} from './firebaseConfig';

// ==========================================
// LIGHTBOX PREMIUM - EXPERIÊNCIA ELEGANTE
// ==========================================

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

const PremiumLightbox: React.FC<LightboxProps> = ({ isOpen, imageSrc, imageAlt, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsImageLoaded(false);
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  const handleAnimationEnd = () => {
    if (!isOpen) setIsVisible(false);
  };
  
  if (!isVisible && !isOpen) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      onTransitionEnd={handleAnimationEnd}
    >
      {/* Backdrop com blur elegante */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#1a365d]/95 via-[#0f2942]/98 to-black/98 backdrop-blur-xl transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b89b5e]/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1e4a7c]/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Botão fechar elegante */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
      >
        <i className="fa-solid fa-xmark text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
      </button>
      
      {/* Badge Prime */}
      <div className="absolute top-6 left-6 z-10">
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#b89b5e]/20 to-[#b89b5e]/10 backdrop-blur-md border border-[#b89b5e]/30">
          <div className="w-2 h-2 rounded-full bg-[#b89b5e] animate-pulse" />
          <span className="text-[#b89b5e] font-bold text-sm tracking-[0.2em] uppercase">Sant'Ana & Sofiatti</span>
        </div>
      </div>
      
      {/* Container da imagem */}
      <div 
        className={`relative max-w-[90vw] max-h-[85vh] transform transition-all duration-700 ease-out ${isOpen ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Loading spinner elegante */}
        {!isImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#b89b5e]/30 rounded-full animate-spin border-t-[#b89b5e]" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-[#b89b5e]/50" />
            </div>
          </div>
        )}
        
        {/* Frame premium */}
        <div className={`relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 transition-all duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Borda dourada sutil */}
          <div className="absolute inset-0 rounded-2xl border border-[#b89b5e]/20 pointer-events-none z-10" />
          
          {/* Efeito de brilho no canto */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full filter blur-2xl pointer-events-none" />
          
          <img 
            src={imageSrc}
            alt={imageAlt}
            onLoad={() => setIsImageLoaded(true)}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
        </div>
        
        {/* Label inferior */}
        <div className={`mt-6 text-center transition-all duration-500 delay-300 ${isImageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-white/90 font-medium text-lg tracking-wide">{imageAlt}</p>
          <p className="text-white/50 text-sm mt-1">Clique fora ou pressione ESC para fechar</p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// PÁGINA ADMIN DE RELATÓRIOS
// ==========================================

const ADMIN_PASSWORD = 'prime2025';

const AdminPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      loadRecentLeads();
    } else {
      setError('Senha incorreta');
    }
  };

  const loadRecentLeads = async () => {
    setLoading(true);
    const data = await getRecentLeads(100);
    setLeads(data);
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      loadRecentLeads();
      return;
    }
    setLoading(true);
    // Buscar por código
    const data = await searchLeadsByCode(searchCode);
    if (data.length > 0) {
      setLeads(data);
      setSelectedLead(data[0]); // Seleciona automaticamente
    } else {
      // Tentar buscar localmente também
      const filtered = leads.filter(lead => 
        lead.leadCode && lead.leadCode.toUpperCase().includes(searchCode.toUpperCase())
      );
      setLeads(filtered.length > 0 ? filtered : []);
    }
    setLoading(false);
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('pt-BR');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Voltar ao site
          </button>
          
          <div className="text-center mb-8">
            <div className={`w-16 h-16 bg-[${DESIGN_SYSTEM.colors.primary}] rounded-full flex items-center justify-center mx-auto mb-4`}>
              <i className="fa-solid fa-lock text-white text-2xl"></i>
            </div>
            <h2 className={`text-2xl font-bold text-[${DESIGN_SYSTEM.colors.primary}]`}>Área Restrita</h2>
            <p className="text-gray-500 text-sm mt-2">Digite a senha para acessar os relatórios</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-6 py-4 text-center rounded-2xl border-2 border-gray-200 focus:border-blue-500 outline-none"
              autoFocus
            />
            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            <button
              type="submit"
              className={`w-full bg-[${DESIGN_SYSTEM.colors.primary}] text-white font-bold py-4 rounded-2xl hover:bg-opacity-90 transition-all`}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className={`bg-[${DESIGN_SYSTEM.colors.primary}] text-white py-6 px-4 shadow-lg`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white/80 hover:text-white">
              <i className="fa-solid fa-arrow-left text-xl"></i>
            </button>
            <h1 className="text-xl font-bold">📊 Painel de Leads</h1>
          </div>
          <button onClick={loadRecentLeads} className="text-white/80 hover:text-white flex items-center gap-2">
            <i className="fa-solid fa-refresh"></i> Atualizar
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Barra de Busca */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
              placeholder="🔍 Buscar por código (ex: SS-A3B7)..."
              className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none font-mono text-lg"
            />
            <button
              onClick={handleSearch}
              className={`bg-[${DESIGN_SYSTEM.colors.secondary}] text-white font-bold px-8 py-4 rounded-xl hover:bg-opacity-90 transition-all`}
            >
              Buscar
            </button>
            <button
              onClick={loadRecentLeads}
              className="bg-gray-200 text-gray-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-300 transition-all"
            >
              Ver Todos
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-blue-500"></i>
            <p className="mt-4 text-gray-500">Carregando leads...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Leads */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className={`bg-[${DESIGN_SYSTEM.colors.primary}] text-white p-4`}>
                <h3 className="font-bold">Leads ({leads.length})</h3>
              </div>
              <div className="max-h-[600px] overflow-y-auto">
                {leads.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Nenhum lead encontrado</p>
                ) : (
                  leads.map((lead, idx) => (
                    <div
                      key={lead.id || idx}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors ${selectedLead?.id === lead.id ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-gray-800 font-mono text-lg">
                          🏷️ {lead.leadCode || 'Sem código'}
                        </span>
                        <div className="flex items-center gap-2">
                          {lead.visitCount > 1 && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                              🔄 {lead.visitCount}x
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            (lead.resumo?.nivelInteresse || 0) >= 70 ? 'bg-green-100 text-green-700' :
                            (lead.resumo?.nivelInteresse || 0) >= 40 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {lead.resumo?.nivelInteresse || 0}%
                          </span>
                        </div>
                      </div>
                      {lead.nomeCliente && (
                        <p className="text-sm font-medium text-blue-700 mb-1">
                          👤 {lead.nomeCliente}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        ⏱️ {lead.totalTimeFormatted || 'N/A'} • 
                        🏠 {lead.plantaMaisVista?.nome || 'Sem planta'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(lead.savedAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Detalhes do Lead */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
              {selectedLead ? (
                <>
                  <div className={`bg-[${DESIGN_SYSTEM.colors.secondary}] text-white p-6`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 font-mono">
                          {selectedLead.leadCode || 'Sem código'}
                        </h3>
                        <p className="opacity-80">
                          Visita em {formatDate(selectedLead.savedAt)}
                        </p>
                      </div>
                      {/* Badge de visitas */}
                      <div className={`px-4 py-2 rounded-full ${(selectedLead.visitCount || 1) > 1 ? 'bg-amber-400/90' : 'bg-white/20'} backdrop-blur-sm`}>
                        <span className="text-white font-bold">
                          {(selectedLead.visitCount || 1) > 1 
                            ? `🔄 Visitante Recorrente (${selectedLead.visitCount}x)` 
                            : `👋 1ª Visita`}
                        </span>
                      </div>
                    </div>
                    {selectedLead.nomeCliente && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <p className="font-bold">👤 {selectedLead.nomeCliente}</p>
                        <p className="opacity-80">📞 {selectedLead.telefoneCliente}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-6 max-h-[700px] overflow-y-auto">
                    {/* Resumo */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-blue-600">{selectedLead.resumo?.nivelInteresse || 0}%</p>
                        <p className="text-xs text-gray-500 mt-1">Nível de Interesse</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-green-600">{selectedLead.totalTimeFormatted}</p>
                        <p className="text-xs text-gray-500 mt-1">Tempo no Site</p>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-purple-600">{selectedLead.device}</p>
                        <p className="text-xs text-gray-500 mt-1">Dispositivo</p>
                      </div>
                      <div className="bg-orange-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-orange-600">{selectedLead.resumo?.origem || 'Direto'}</p>
                        <p className="text-xs text-gray-500 mt-1">Origem</p>
                      </div>
                      <div className={`rounded-xl p-4 text-center ${selectedLead.visitCount > 1 ? 'bg-amber-50' : 'bg-gray-50'}`}>
                        <p className={`text-2xl font-bold ${selectedLead.visitCount > 1 ? 'text-amber-600' : 'text-gray-600'}`}>
                          {selectedLead.visitCount || 1}ª
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Visita</p>
                      </div>
                    </div>

                    {/* Planta Preferida */}
                    {selectedLead.plantaMaisVista && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <h4 className="font-bold text-green-800 mb-2">🏠 Planta Preferida (mais tempo)</h4>
                        <p className="text-2xl font-black text-green-700">
                          {selectedLead.plantaMaisVista.nome}
                        </p>
                        <p className="text-green-600">
                          Ficou olhando por: <strong>{selectedLead.plantaMaisVista.tempoFormatado}</strong>
                        </p>
                      </div>
                    )}

                    {/* Tempo em cada Planta */}
                    {Object.keys(selectedLead.floorPlanTimeSpent || {}).length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-700 mb-3">📐 Tempo em cada Planta</h4>
                        <div className="space-y-2">
                          {Object.entries(selectedLead.floorPlanTimeFormatted || {}).map(([plan, time]) => (
                            <div key={plan} className="flex items-center justify-between bg-white rounded-lg p-3">
                              <span className="font-medium text-gray-700">{plan}</span>
                              <span className={`font-bold ${plan === selectedLead.plantaMaisVista?.nome ? 'text-green-600' : 'text-gray-500'}`}>
                                {time as string}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Foto Preferida */}
                    {selectedLead.fotoMaisVista && (
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <h4 className="font-bold text-purple-800 mb-2">🖼️ Foto Preferida (mais tempo)</h4>
                        <p className="text-xl font-black text-purple-700">
                          {selectedLead.fotoMaisVista.nome}
                        </p>
                        <p className="text-purple-600">
                          Ficou olhando por: <strong>{selectedLead.fotoMaisVista.tempoFormatado}</strong>
                        </p>
                      </div>
                    )}

                    {/* Tempo em cada Foto */}
                    {Object.keys(selectedLead.galleryImageTimeSpent || {}).length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-700 mb-3">🖼️ Tempo em cada Foto da Galeria</h4>
                        <div className="space-y-2">
                          {Object.entries(selectedLead.galleryTimeFormatted || {}).map(([img, time]) => (
                            <div key={img} className="flex items-center justify-between bg-white rounded-lg p-3">
                              <span className="font-medium text-gray-700">{img}</span>
                              <span className={`font-bold ${img === selectedLead.fotoMaisVista?.nome ? 'text-purple-600' : 'text-gray-500'}`}>
                                {time as string}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Itens de Lazer */}
                    {selectedLead.leisureItemsClicked?.length > 0 && (
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-bold text-blue-700 mb-2">🏊 Interesse em Lazer</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedLead.leisureItemsClicked.map((item: string, idx: number) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navegação */}
                    {selectedLead.navigationClicks?.length > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="font-bold text-gray-700 mb-2">🧭 Navegação</h4>
                        <p className="text-gray-600 text-sm">
                          {selectedLead.navigationClicks.join(' → ')}
                        </p>
                      </div>
                    )}

                    {/* Timeline de Ações */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                      <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
                        <i className="fa-solid fa-timeline"></i>
                        Linha do Tempo {selectedLead.timeline?.length > 0 ? `(${selectedLead.timeline.length} ações)` : ''}
                      </h4>
                      {selectedLead.timeline?.length > 0 ? (
                        <div className="relative">
                          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200"></div>
                          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                            {selectedLead.timeline.map((event: any, idx: number) => (
                              <div key={idx} className="relative pl-10">
                                <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                                  event.action === 'whatsapp_click' ? 'bg-green-500 text-white' :
                                  event.action === 'lightbox_open' ? 'bg-purple-500 text-white' :
                                  event.action === 'floor_plan_view' ? 'bg-blue-500 text-white' :
                                  event.action === 'leisure_click' ? 'bg-cyan-500 text-white' :
                                  event.action === 'gallery_view' ? 'bg-pink-500 text-white' :
                                  'bg-gray-300 text-gray-600'
                                }`}>
                                  {event.action === 'whatsapp_click' ? '💬' :
                                   event.action === 'lightbox_open' ? '🔍' :
                                   event.action === 'floor_plan_view' ? '📐' :
                                   event.action === 'leisure_click' ? '🏊' :
                                   event.action === 'gallery_view' ? '🖼️' :
                                   event.action === 'navigation_click' ? '🧭' :
                                   event.action === 'image_view' ? '👁️' :
                                   event.action === 'session_start' ? '🚀' :
                                   '•'}
                                </div>
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-800 text-sm">
                                      {event.action === 'session_start' ? 'Iniciou sessão' :
                                       event.action === 'page_view' ? 'Visualizou página' :
                                       event.action === 'whatsapp_click' ? 'Clicou WhatsApp' :
                                       event.action === 'lightbox_open' ? 'Ampliou imagem' :
                                       event.action === 'floor_plan_view' ? 'Viu planta' :
                                       event.action === 'leisure_click' ? 'Clicou lazer' :
                                       event.action === 'gallery_view' ? 'Viu galeria' :
                                       event.action === 'navigation_click' ? 'Navegou' :
                                       event.action === 'image_view' ? 'Viu imagem' :
                                       event.action === 'form_submit' ? 'Enviou formulário' :
                                       event.action}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      {new Date(event.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </span>
                                  </div>
                                  {event.details && (
                                    <p className="text-xs text-gray-500 mt-1">{event.details}</p>
                                  )}
                                  {event.section && (
                                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500">
                                      {event.section}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <i className="fa-solid fa-clock-rotate-left text-3xl mb-2 opacity-50"></i>
                          <p className="text-sm">Lead capturado antes da atualização.</p>
                          <p className="text-xs mt-1">Novos leads terão a linha do tempo completa.</p>
                        </div>
                      )}
                    </div>

                    {/* Dispositivo */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-bold text-gray-700 mb-2">📱 Informações Técnicas</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Navegador:</span>
                          <span className="ml-2 font-medium">{selectedLead.browser}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Tela:</span>
                          <span className="ml-2 font-medium">{selectedLead.screenSize}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Referrer:</span>
                          <span className="ml-2 font-medium">{selectedLead.referrer || 'Direto'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Session ID:</span>
                          <span className="ml-2 font-medium text-xs">{selectedLead.sessionId?.slice(-10)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full py-20">
                  <div className="text-center text-gray-400">
                    <i className="fa-solid fa-mouse-pointer text-6xl mb-4"></i>
                    <p>Selecione um lead para ver os detalhes</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTES ORIGINAIS (ATUALIZADOS)
// ==========================================

const Navbar: React.FC<{ onWhatsAppClick: (location: string) => void }> = ({ onWhatsAppClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 ${DESIGN_SYSTEM.transition}`}>
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <span className={`text-xl font-bold tracking-${DESIGN_SYSTEM.typography.tracking.widest} text-[${DESIGN_SYSTEM.colors.primary}]`}>
              {SITE_METADATA.name}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => trackNavigationClick(link.label)}
                className={`text-gray-600 hover:text-[${DESIGN_SYSTEM.colors.primary}] font-medium ${DESIGN_SYSTEM.transition} text-sm`}
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={() => onWhatsAppClick('navbar_desktop')}
              className={`bg-[${DESIGN_SYSTEM.colors.primary}] text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 ${DESIGN_SYSTEM.transition} text-sm`}
            >
              CONTATO
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none" aria-label="Abrir Menu">
              <i className={`fa-solid ${isOpen ? 'fa-x' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => { setIsOpen(false); trackNavigationClick(link.label + '_mobile'); }}
              className={`block text-gray-600 hover:text-[${DESIGN_SYSTEM.colors.primary}] font-medium`}
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={() => { setIsOpen(false); onWhatsAppClick('navbar_mobile'); }}
            className={`block w-full text-center bg-[${DESIGN_SYSTEM.colors.primary}] text-white px-6 py-2 rounded-full font-medium`}
          >
            CONTATO
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-105"
        style={{ backgroundImage: `url(${getDriveImageUrl(HERO_CONTENT.backgroundId, 1920)})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative text-center text-white px-4">
        <h1 className="text-4xl md:text-7xl font-light tracking-[0.2em] mb-4">
          {HERO_CONTENT.title}
        </h1>
        <h2 className="text-2xl md:text-4xl font-light tracking-[0.4em] mb-8">
          {HERO_CONTENT.subtitle}
        </h2>
        <p className="text-sm md:text-base tracking-widest opacity-80 uppercase">
          {HERO_CONTENT.location}
        </p>
        <div className="mt-12 flex justify-center">
          <div className="animate-bounce">
            <i className="fa-solid fa-chevron-down text-2xl"></i>
          </div>
        </div>
      </div>
      {/* Preload hero background for performance */}
      <link rel="prefetch" href={getDriveImageUrl(HERO_CONTENT.backgroundId, 1920)} />
    </section>
  );
};

const About: React.FC<{ onImageClick: (src: string, alt: string) => void }> = ({ onImageClick }) => {
  return (
    <section id="about" className={`${DESIGN_SYSTEM.spacing.sectionPadding} bg-white overflow-hidden`}>
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 sticky top-32">
            <h2 className={`text-5xl md:text-6xl font-serif text-[${DESIGN_SYSTEM.colors.primary}] mb-8 tracking-tight uppercase leading-tight`}>
              {ABOUT_CONTENT.title}
            </h2>
            <p className={`text-xl text-[${DESIGN_SYSTEM.colors.secondary}] font-semibold mb-8 leading-snug`}>
              {ABOUT_CONTENT.subtitle}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-12 text-justify">
              {ABOUT_CONTENT.mainText}
            </p>
            <div className={`border-l-[6px] border-[${DESIGN_SYSTEM.colors.secondary}] pl-8 py-4 bg-[#f8fbff] rounded-r-2xl shadow-sm`}>
              <p className={`text-[${DESIGN_SYSTEM.colors.primary}] font-black text-2xl leading-tight`}>
                {HERO_CONTENT.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div 
              className={`${DESIGN_SYSTEM.radius.large} overflow-hidden shadow-2xl border-4 border-white group cursor-pointer relative`}
              onClick={() => {
                trackImageView('facade', 'Fachada Principal Dia');
                trackLightboxOpen('fachada', 'Fachada Principal Dia');
                onImageClick(getDriveImageUrl(ABOUT_CONTENT.facadeDayId, 1600), 'Fachada Principal - Dia');
              }}
            >
              <img 
                src={getDriveImageUrl(ABOUT_CONTENT.facadeDayId, 1200)} 
                alt="Fachada Principal Dia" 
                loading="lazy"
                decoding="async"
                className={`w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <div className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                  <i className="fa-solid fa-expand text-[#1a365d]"></i>
                  <span className="text-[#1a365d] font-bold text-sm">Ampliar</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div 
                className={`${DESIGN_SYSTEM.radius.medium} overflow-hidden shadow-xl border-4 border-white group cursor-pointer relative`}
                onClick={() => {
                  trackImageView('facade', 'Fachada Noite 1');
                  trackLightboxOpen('fachada', 'Fachada Noite 1');
                  onImageClick(getDriveImageUrl(ABOUT_CONTENT.facadeNightId, 1600), 'Fachada - Noite');
                }}
              >
                <img 
                  src={getDriveImageUrl(ABOUT_CONTENT.facadeNightId, 600)} 
                  alt="Fachada Noite 1" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <i className="fa-solid fa-expand text-[#1a365d]"></i>
                  </div>
                </div>
              </div>
              <div 
                className={`${DESIGN_SYSTEM.radius.medium} overflow-hidden shadow-xl border-4 border-white group cursor-pointer relative`}
                onClick={() => {
                  trackImageView('facade', 'Fachada Noite 2');
                  trackLightboxOpen('fachada', 'Fachada Noite 2');
                  onImageClick(getDriveImageUrl(ABOUT_CONTENT.facadeNight2Id, 1600), 'Fachada - Vista Noturna');
                }}
              >
                <img 
                  src={getDriveImageUrl(ABOUT_CONTENT.facadeNight2Id, 600)} 
                  alt="Fachada Noite 2" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                    <i className="fa-solid fa-expand text-[#1a365d]"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Leisure: React.FC<{ onImageClick: (src: string, alt: string) => void }> = ({ onImageClick }) => {
  return (
    <section id="leisure" className={`${DESIGN_SYSTEM.spacing.sectionPadding} bg-[${DESIGN_SYSTEM.colors.surface}]`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-serif text-[${DESIGN_SYSTEM.colors.primary}] mb-4`}>Experiências Incomparáveis</h2>
          <div className={`w-24 h-1 bg-[${DESIGN_SYSTEM.colors.secondary}] mx-auto mb-6`}></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Um clube completo com lazer premium, pensado para cada detalhe do seu bem-estar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {LEISURE_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className={`group relative overflow-hidden ${DESIGN_SYSTEM.radius.large} bg-white ${DESIGN_SYSTEM.shadows.medium} ${DESIGN_SYSTEM.transition} hover:-translate-y-2 border border-gray-100 flex flex-col cursor-pointer`}
              onClick={() => {
                trackLeisureItemClick(item.title);
                trackLightboxOpen('lazer', item.title);
                onImageClick(getDriveImageUrl(item.imageId, 1600), item.title);
              }}
            >
              <div className="aspect-[16/12] overflow-hidden relative">
                <img 
                  src={getDriveImageUrl(item.imageId, 600)} 
                  alt={item.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay de hover com ícone de ampliar */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <i className="fa-solid fa-expand text-[#1a365d]"></i>
                    <span className="text-[#1a365d] font-bold text-sm">Ampliar</span>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-5 mb-5">
                  <div className={`w-14 h-14 min-w-[3.5rem] rounded-full bg-[#f0f4f8] flex items-center justify-center text-[${DESIGN_SYSTEM.colors.primary}] shadow-inner`}>
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                  </div>
                  <h3 className={`text-lg font-extrabold text-[${DESIGN_SYSTEM.colors.primary}] uppercase tracking-wider leading-tight`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FloorPlans: React.FC<{ onImageClick: (src: string, alt: string) => void }> = ({ onImageClick }) => {
  const [selectedPlan, setSelectedPlan] = useState(FLOOR_PLANS[0]);

  return (
    <section id="floorplans" className={`${DESIGN_SYSTEM.spacing.sectionPadding} bg-white`}>
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-serif text-[${DESIGN_SYSTEM.colors.primary}] mb-4`}>Plantas Inteligentes</h2>
          <div className={`w-24 h-1 bg-[${DESIGN_SYSTEM.colors.secondary}] mx-auto mb-6`}></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Arquitetura moderna com metragens otimizadas para o seu conforto.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {FLOOR_PLANS.map((plan) => (
            <button
              key={plan.title}
              onClick={() => { 
                setSelectedPlan(plan); 
                trackFloorPlanView(plan.title);
              }}
              className={`px-6 py-2 rounded-full font-bold ${DESIGN_SYSTEM.transition} text-sm tracking-wide ${
                selectedPlan.title === plan.title 
                ? `bg-[${DESIGN_SYSTEM.colors.primary}] text-white shadow-lg scale-105` 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <div className={`bg-gray-50 ${DESIGN_SYSTEM.radius.extraLarge} p-4 md:p-8 lg:p-10 shadow-inner border border-gray-100`}>
          <div className="flex flex-col gap-8 items-center">
            <div 
              className={`w-full bg-white p-4 md:p-8 lg:p-10 ${DESIGN_SYSTEM.radius.large} ${DESIGN_SYSTEM.shadows.deep} hover:shadow-blue-900/5 ${DESIGN_SYSTEM.transition} flex justify-center overflow-hidden cursor-pointer group relative`}
              onClick={() => {
                trackLightboxOpen('planta', selectedPlan.title);
                onImageClick(getDriveImageUrl(selectedPlan.imageId, 1600), `Planta - ${selectedPlan.title}`);
              }}
            >
              <img 
                src={getDriveImageUrl(selectedPlan.imageId, 1200)} 
                alt={selectedPlan.title} 
                loading="lazy"
                decoding="async"
                className="max-h-[70vh] w-full object-contain animate-fadeIn"
                key={selectedPlan.imageId} 
              />
              {/* Overlay para ampliar */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <div className="flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-xl">
                  <i className="fa-solid fa-expand text-[#1a365d]"></i>
                  <span className="text-[#1a365d] font-bold">Clique para ampliar</span>
                </div>
              </div>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              <div>
                <h3 className={`text-4xl font-black text-[${DESIGN_SYSTEM.colors.primary}] mb-2 uppercase tracking-tight`}>{selectedPlan.title}</h3>
                <p className={`text-5xl text-[${DESIGN_SYSTEM.colors.secondary}] font-bold mb-6`}>{selectedPlan.area}</p>
                <div className={`w-20 h-2 bg-[${DESIGN_SYSTEM.colors.secondary}] mb-8 rounded-full`}></div>
                <p className="text-2xl text-gray-600 font-medium leading-relaxed">{selectedPlan.description}</p>
              </div>
              <div className="space-y-4">
                <div className={`flex items-center gap-4 text-gray-700 bg-white p-4 ${DESIGN_SYSTEM.radius.medium} ${DESIGN_SYSTEM.shadows.soft} border border-gray-100`}>
                  <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                    <i className="fa-solid fa-check text-lg"></i>
                  </div>
                  <span className="font-bold text-base">Ventilação e iluminação natural</span>
                </div>
                <div className={`flex items-center gap-4 text-gray-700 bg-white p-4 ${DESIGN_SYSTEM.radius.medium} ${DESIGN_SYSTEM.shadows.soft} border border-gray-100`}>
                  <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                    <i className="fa-solid fa-check text-lg"></i>
                  </div>
                  <span className="font-bold text-base">Acabamento de alto padrão</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HighlightSection: React.FC<{ onImageClick: (src: string, alt: string) => void }> = ({ onImageClick }) => {
  return (
    <section className="py-6 bg-white">
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div 
          className={`${DESIGN_SYSTEM.radius.extraLarge} overflow-hidden ${DESIGN_SYSTEM.shadows.deep} border border-gray-100 bg-white cursor-pointer group relative`}
          onClick={() => {
            trackLightboxOpen('destaque', 'Imagem Destaque');
            onImageClick(getDriveImageUrl(HIGHLIGHT_IMAGE_ID, 1600), "Destaque Sant'Ana & Sofiatti");
          }}
        >
          <img 
            src={getDriveImageUrl(HIGHLIGHT_IMAGE_ID, 1200)} 
            alt="Destaque Sant'Ana & Sofiatti" 
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <div className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
              <i className="fa-solid fa-expand text-[#1a365d]"></i>
              <span className="text-[#1a365d] font-bold text-sm">Ampliar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery: React.FC<{ onImageClick: (src: string, alt: string) => void }> = ({ onImageClick }) => {
  return (
    <section id="gallery" className={`${DESIGN_SYSTEM.spacing.sectionPadding} bg-[${DESIGN_SYSTEM.colors.surface}]`}>
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-serif text-[${DESIGN_SYSTEM.colors.primary}] mb-4`}>Galeria de Imagens</h2>
          <div className={`w-24 h-1 bg-[${DESIGN_SYSTEM.colors.secondary}] mx-auto mb-6`}></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Um olhar detalhado sobre o seu futuro lar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                trackGalleryView(item.title);
                trackLightboxOpen('galeria', item.title);
                onImageClick(getDriveImageUrl(item.imageId, 1600), item.title);
              }}
              className={`group relative overflow-hidden ${DESIGN_SYSTEM.radius.large} bg-white ${DESIGN_SYSTEM.shadows.deep} aspect-video border-8 border-white cursor-pointer`}
            >
              <img 
                src={getDriveImageUrl(item.imageId, 800)} 
                alt={item.title} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-2xl font-black mb-2 uppercase">{item.title}</h3>
                    <p className="text-white/80 font-medium">{item.caption}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <i className="fa-solid fa-expand text-white text-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location: React.FC = () => {
  const [mapExpanded, setMapExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState<'roadmap' | 'satellite'>('roadmap');
  const [showStreetView, setShowStreetView] = useState(false);

  // Coordenadas do empreendimento
  const lat = -20.658828944742876;
  const lng = -40.49563584432545;

  const handleMapClick = () => {
    if (!mapExpanded) {
      setMapExpanded(true);
      // Após expandir, muda para satélite após 1 segundo para efeito surpresa
      setTimeout(() => {
        setMapStyle('satellite');
      }, 800);
    } else {
      // Alterna entre satélite e mapa
      setMapStyle(prev => prev === 'roadmap' ? 'satellite' : 'roadmap');
    }
  };

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}&z=18`, '_blank');
  };

  const toggleStreetView = () => {
    setShowStreetView(!showStreetView);
  };

  return (
    <section id="location" className={`${DESIGN_SYSTEM.spacing.sectionPadding} bg-[${DESIGN_SYSTEM.colors.primary}] text-white overflow-hidden`}>
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-serif mb-4 tracking-${DESIGN_SYSTEM.typography.tracking.wide} uppercase`}>Localização Privilegiada</h2>
          <div className={`w-24 h-1 bg-[${DESIGN_SYSTEM.colors.secondary}] mx-auto mb-6`}></div>
          <p className="opacity-80 max-w-2xl mx-auto text-xl font-light italic">
            Viva a conveniência de estar a poucos metros da Praia do Morro.
          </p>
        </div>

        {/* Container do Mapa Interativo */}
        <div 
          className={`mb-20 ${DESIGN_SYSTEM.radius.extraLarge} overflow-hidden shadow-2xl shadow-black/40 border-4 border-white/10 relative group cursor-pointer transition-all duration-700 ${mapExpanded ? 'h-[600px]' : 'h-[450px]'}`}
          onClick={handleMapClick}
        >
          {/* Mapa do Google Maps Embed */}
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1500!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDM5JzMxLjgiUyA0MMKwMjknNDQuMyJX!5e${mapStyle === 'satellite' ? '1' : '0'}!3m2!1spt-BR!2sbr!4v1704067200000!5m2!1spt-BR!2sbr`}
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: mapExpanded ? 'auto' : 'none' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full transition-transform duration-1000"
          />

          {/* Camada de bloqueio - Trava o mapa até a interação */}
          {!mapExpanded && (
            <div className="absolute inset-0 z-[5] cursor-pointer" />
          )}

          {/* Overlay com efeito de brilho */}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#1a365d]/80 via-transparent to-transparent transition-opacity duration-500 ${mapExpanded ? 'opacity-30' : 'opacity-60'} pointer-events-none`} />

          {/* Pino Personalizado Animado - desaparece ao expandir */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10 transition-all duration-500 ${mapExpanded ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}>
            <div className={`relative transition-all duration-500 scale-110`}>
              {/* Sombra do pino */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-black/30 rounded-full blur-sm animate-pulse" />
              
              {/* Pino principal */}
              <div className="relative animate-bounce" style={{ animationDuration: '2s' }}>
                <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-2xl">
                  {/* Forma do pino */}
                  <defs>
                    <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#b89b5e" />
                      <stop offset="50%" stopColor="#d4af37" />
                      <stop offset="100%" stopColor="#b89b5e" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <path 
                    d="M30 0C13.4 0 0 13.4 0 30c0 22.5 30 50 30 50s30-27.5 30-50C60 13.4 46.6 0 30 0z" 
                    fill="url(#pinGradient)"
                    filter="url(#glow)"
                  />
                  {/* Círculo interno branco */}
                  <circle cx="30" cy="28" r="16" fill="white" />
                  {/* Logo S&S */}
                  <text x="30" y="35" textAnchor="middle" fill="#1a365d" fontSize="16" fontWeight="bold" fontFamily="serif">S&S</text>
                </svg>
              </div>
              
              {/* Ondas de pulso */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 rounded-full border-2 border-[#b89b5e] animate-ping opacity-30" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-[#b89b5e] animate-ping opacity-20" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
              </div>
            </div>
          </div>

          {/* Badge de instrução */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 ${mapExpanded ? 'opacity-0 translate-y-4' : 'opacity-100'}`}>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-2xl">
              <div className="w-3 h-3 bg-[#b89b5e] rounded-full animate-pulse" />
              <span className="text-[#1a365d] font-bold text-sm">Clique para explorar</span>
              <i className="fa-solid fa-hand-pointer text-[#b89b5e] animate-bounce"></i>
            </div>
          </div>

          {/* Controles do mapa (aparecem após expandir) */}
          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${mapExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <button 
              onClick={(e) => { e.stopPropagation(); setMapStyle('roadmap'); }}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mapStyle === 'roadmap' ? 'bg-white text-[#1a365d]' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <i className="fa-solid fa-map mr-2"></i>Mapa
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setMapStyle('satellite'); }}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${mapStyle === 'satellite' ? 'bg-white text-[#1a365d]' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <i className="fa-solid fa-satellite mr-2"></i>Satélite
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); openGoogleMaps(); }}
              className="px-4 py-2 rounded-lg font-bold text-sm bg-[#b89b5e] text-white hover:bg-[#a08a4e] transition-all"
            >
              <i className="fa-solid fa-route mr-2"></i>Rota
            </button>
          </div>

          {/* Info card (aparece após expandir) */}
          <div className={`absolute bottom-6 left-6 transition-all duration-700 delay-300 ${mapExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#b89b5e] to-[#d4af37] flex items-center justify-center shadow-lg">
                  <i className="fa-solid fa-location-dot text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-black text-[#1a365d] text-sm uppercase tracking-wide">Sant'Ana & Sofiatti</h4>
                  <p className="text-gray-500 text-xs">Home Club</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                📍 Praia do Morro, Guarapari/ES<br/>
                🏖️ A 100m da praia
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LOCATION_POINTS.map((point, index) => (
            <div 
              key={index} 
              className={`p-10 ${DESIGN_SYSTEM.radius.large} bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 ${DESIGN_SYSTEM.transition} flex flex-col items-start`}
            >
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-10 shadow-2xl transform transition-transform hover:rotate-12"
                style={{ backgroundColor: point.color }}
              >
                <i className={`fa-solid ${point.icon} text-white text-3xl`}></i>
              </div>
              <h3 className="text-sm font-black mb-5 tracking-widest text-white leading-tight uppercase min-h-[3rem]">{point.category}</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-medium">{point.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parar timers ativos
    stopFloorPlanTimer();
    stopGalleryImageTimer();
    
    // Salvar lead com dados do formulário no Firebase
    const leadCode = await saveLeadWithFormData(formData);
    
    // Mostrar confirmação
    setSubmitted(true);
    
    // Criar mensagem com nome, telefone e código
    const message = `Olá! Meu nome é ${formData.name}.%0ATelefone: ${formData.phone}%0A%0AGostaria de receber mais informações sobre o Sant'Ana %26 Sofiatti Home Club.%0A%0A🏷️ Meu código: ${leadCode || getLeadCode()}`;
    
    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/5527998970484?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpar formulário após 5 segundos
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 5000);
  };

  return (
    <section className={`${DESIGN_SYSTEM.spacing.sectionPadding} bg-white border-t border-gray-100`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-serif text-[${DESIGN_SYSTEM.colors.primary}] mb-4`}>{FORM_CONTENT.title}</h2>
          <p className="text-gray-500 text-lg font-medium">{FORM_CONTENT.subtitle}</p>
        </div>

        <div className={`bg-[#f8fbff] p-10 md:p-16 ${DESIGN_SYSTEM.radius.extraLarge} ${DESIGN_SYSTEM.shadows.deep} border border-blue-50`}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className={`block text-sm font-bold text-[${DESIGN_SYSTEM.colors.primary}] ml-2`}>
                    {FORM_CONTENT.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-8 py-5 ${DESIGN_SYSTEM.radius.medium} bg-white border border-blue-100 focus:border-[${DESIGN_SYSTEM.colors.secondary}] focus:ring-4 focus:ring-[${DESIGN_SYSTEM.colors.secondary}]/10 outline-none ${DESIGN_SYSTEM.transition} shadow-sm font-medium`}
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="space-y-3">
                  <label className={`block text-sm font-bold text-[${DESIGN_SYSTEM.colors.primary}] ml-2`}>
                    {FORM_CONTENT.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-8 py-5 ${DESIGN_SYSTEM.radius.medium} bg-white border border-blue-100 focus:border-[${DESIGN_SYSTEM.colors.secondary}] focus:ring-4 focus:ring-[${DESIGN_SYSTEM.colors.secondary}]/10 outline-none ${DESIGN_SYSTEM.transition} shadow-sm font-medium`}
                    placeholder="(27) 99897-0484"
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full bg-[${DESIGN_SYSTEM.colors.primary}] text-white font-black py-6 px-10 rounded-2xl hover:bg-[#2a4e7c] transform ${DESIGN_SYSTEM.transition} active:scale-[0.98] shadow-2xl shadow-blue-900/30 tracking-[0.2em] text-sm uppercase`}
              >
                {FORM_CONTENT.buttonText}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 animate-fadeIn">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <i className="fa-solid fa-check text-5xl"></i>
              </div>
              <h3 className={`text-3xl font-black text-[${DESIGN_SYSTEM.colors.primary}] mb-3`}>DADOS ENVIADOS!</h3>
              <p className="text-gray-600 font-medium">{FORM_CONTENT.successMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const AgencySection: React.FC = () => {
  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="mb-8 max-w-[250px]">
           <img 
             src={getDriveImageUrl(PRIME_AGENCY_DATA.logoDriveId, 400)} 
             alt="Logo Prime" 
             loading="lazy"
             decoding="async"
             className="w-full h-auto" 
             referrerPolicy="no-referrer" 
           />
        </div>

        <div className="max-w-4xl mb-16">
          <span className={`text-[${DESIGN_SYSTEM.colors.secondary}] font-black uppercase tracking-[0.3em] text-[12px] mb-4 block`}>
            {PRIME_AGENCY_DATA.badge}
          </span>
          <h3 className={`text-2xl md:text-3xl font-black text-[${DESIGN_SYSTEM.colors.primary}] mb-8 uppercase tracking-tighter leading-tight`}>
            Conectando você ao melhor de Guarapari
          </h3>
          <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-5xl mx-auto">
            {PRIME_AGENCY_DATA.description}
          </p>
          <a 
            href={PRIME_AGENCY_DATA.website} 
            target="_blank" 
            className={`inline-flex items-center gap-3 border-2 border-[${DESIGN_SYSTEM.colors.primary}] text-[${DESIGN_SYSTEM.colors.primary}] px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[${DESIGN_SYSTEM.colors.primary}] hover:text-white ${DESIGN_SYSTEM.transition} shadow-xl shadow-blue-900/5`}
          >
            Visitar Site da Prime <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {PRIME_AGENCY_DATA.stores.map((store, idx) => (
            <div key={idx} className={`bg-white rounded-[32px] ${DESIGN_SYSTEM.shadows.deep} overflow-hidden border border-slate-100 group flex flex-col`}>
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={getDriveImageUrl(store.imageDriveId, 600)} 
                  alt={store.name} 
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover group-hover:scale-110 ${DESIGN_SYSTEM.transition}`} 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-left">
                  <h4 className="text-white font-black text-xl uppercase tracking-tight">{store.name}</h4>
                </div>
              </div>
              <div className="p-8 text-left flex-grow flex items-center">
                <a 
                  href={store.mapsUrl} 
                  target="_blank"
                  onClick={() => trackStoreClick(store.name, store.address)}
                  className="flex items-start gap-4 group/link"
                >
                  <i className={`fa-solid fa-location-dot text-[${DESIGN_SYSTEM.colors.secondary}] shrink-0 mt-1 text-xl group-hover/link:scale-125 ${DESIGN_SYSTEM.transition}`}></i>
                  <p className={`text-slate-600 font-bold text-base leading-tight group-hover/link:text-[${DESIGN_SYSTEM.colors.primary}] ${DESIGN_SYSTEM.transition}`}>{store.address}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC<{ onWhatsAppClick: (location: string) => void }> = ({ onWhatsAppClick }) => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className={DESIGN_SYSTEM.spacing.container}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
          <div>
            <h3 className={`text-2xl font-black text-[${DESIGN_SYSTEM.colors.primary}] mb-8 tracking-[0.2em] uppercase`}>
              {SITE_METADATA.name}
            </h3>
            <p className="text-gray-500 leading-relaxed font-medium text-base">
              {FOOTER_CONTENT.description}
            </p>
          </div>
          <div>
            <h4 className={`text-sm font-black text-[${DESIGN_SYSTEM.colors.primary}] mb-8 uppercase tracking-[0.3em] opacity-50`}>Navegação</h4>
            <ul className="space-y-5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={`text-gray-600 hover:text-[${DESIGN_SYSTEM.colors.primary}] font-bold ${DESIGN_SYSTEM.transition} text-sm tracking-widest`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`text-sm font-black text-[${DESIGN_SYSTEM.colors.primary}] mb-8 uppercase tracking-[0.3em] opacity-50`}>Contato</h4>
            <ul className="space-y-5">
              <li className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[${DESIGN_SYSTEM.colors.secondary}]`}>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <span className="font-bold">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[${DESIGN_SYSTEM.colors.secondary}]`}>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <span className="font-bold">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[${DESIGN_SYSTEM.colors.secondary}]`}>
                  <i className="fa-brands fa-instagram"></i>
                </div>
                <span className="font-bold">{CONTACT_INFO.instagram}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-10 text-center text-gray-400 text-xs font-bold tracking-[0.1em] uppercase">
          <p>{FOOTER_CONTENT.copyright}</p>
        </div>
      </div>

      <button 
        onClick={() => onWhatsAppClick('floating_button')}
        aria-label="Contato via WhatsApp"
        className={`fixed bottom-10 right-10 z-50 bg-[#25d366] text-white w-16 h-16 rounded-full ${DESIGN_SYSTEM.shadows.floating} hover:scale-110 ${DESIGN_SYSTEM.transition} flex items-center justify-center ring-8 ring-green-500/10`}
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </button>
    </footer>
  );
};

const App: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState({ src: '', alt: '' });

  useEffect(() => {
    // Verificar se é acesso à página admin
    if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
      setShowAdmin(true);
    }

    // Rastrear visualização da página inicial
    trackPageView('Home - Sant\'Ana & Sofiatti');

    // Listener para mudanças no hash
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleWhatsAppClick = async (location: string) => {
    // Parar todos os timers ativos
    stopFloorPlanTimer();
    stopGalleryImageTimer();
    
    // Salvar lead e obter o código
    const leadCode = await trackWhatsAppClick(location);
    
    // Criar mensagem com o código (usando %0A para quebra de linha)
    const message = `Olá! Gostaria de receber mais informações sobre o Sant'Ana %26 Sofiatti Home Club.%0A%0A🏷️ Meu código: ${leadCode || getLeadCode()}`;
    
    // Abrir WhatsApp com a mensagem contendo o código
    const whatsappUrl = `https://wa.me/5527998970484?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Função para abrir lightbox
  const handleImageClick = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
    setLightboxOpen(true);
  };

  // Renderizar página admin se necessário
  if (showAdmin) {
    return (
      <AdminPage onBack={() => {
        setShowAdmin(false);
        window.location.hash = '';
      }} />
    );
  }

  return (
    <div className={`min-h-screen selection:bg-[${DESIGN_SYSTEM.colors.secondary}] selection:text-white bg-white antialiased`}>
      <Navbar onWhatsAppClick={handleWhatsAppClick} />
      <Hero />
      <About onImageClick={handleImageClick} />
      <Leisure onImageClick={handleImageClick} />
      <FloorPlans onImageClick={handleImageClick} />
      <HighlightSection onImageClick={handleImageClick} />
      <Gallery onImageClick={handleImageClick} />
      <Location />
      <ContactForm />
      <AgencySection />
      <Footer onWhatsAppClick={handleWhatsAppClick} />
      
      {/* Premium Lightbox */}
      <PremiumLightbox 
        isOpen={lightboxOpen}
        imageSrc={lightboxImage.src}
        imageAlt={lightboxImage.alt}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default App;

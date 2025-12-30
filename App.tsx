
import React, { useState } from 'react';
import { 
  THEME, 
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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-widest text-[#1e3a5f]">
              {SITE_METADATA.name}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-gray-600 hover:text-[#1e3a5f] font-medium transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
            <a 
              href={CONTACT_INFO.whatsapp} 
              target="_blank" 
              className="bg-[#1e3a5f] text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-all text-sm"
            >
              CONTATO
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
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
              onClick={() => setIsOpen(false)} 
              className="block text-gray-600 hover:text-[#1e3a5f] font-medium"
            >
              {link.label}
            </a>
          ))}
          <a 
            href={CONTACT_INFO.whatsapp} 
            target="_blank" 
            className="block text-center bg-[#1e3a5f] text-white px-6 py-2 rounded-full font-medium"
          >
            CONTATO
          </a>
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
        style={{ backgroundImage: `url(${getDriveImageUrl(HERO_CONTENT.backgroundId)})` }}
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
    </section>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Texto à esquerda */}
          <div className="lg:col-span-5 sticky top-32">
            <h2 className="text-5xl md:text-6xl font-serif text-[#1e3a5f] mb-8 tracking-tight uppercase leading-tight">
              {ABOUT_CONTENT.title}
            </h2>
            <p className="text-xl text-[#a1835b] font-semibold mb-8 leading-snug">
              {ABOUT_CONTENT.subtitle}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg mb-12 text-justify">
              {ABOUT_CONTENT.mainText}
            </p>
            <div className="border-l-[6px] border-[#a1835b] pl-8 py-4 bg-[#f8fbff] rounded-r-2xl shadow-sm">
              <p className="text-[#1e3a5f] font-black text-2xl leading-tight">
                {HERO_CONTENT.description}
              </p>
            </div>
          </div>

          {/* Área de Imagens à direita - Layout organizado verticalmente */}
          <div className="lg:col-span-7 space-y-8">
            {/* Fachada Dia Principal */}
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
              <img 
                src={getDriveImageUrl(ABOUT_CONTENT.facadeDayId)} 
                alt="Fachada Principal Dia" 
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            {/* Row para 2 Fachadas Noturnas menores embaixo */}
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
                <img 
                  src={getDriveImageUrl(ABOUT_CONTENT.facadeNightId)} 
                  alt="Fachada Noite 1" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
                <img 
                  src={getDriveImageUrl(ABOUT_CONTENT.facadeNight2Id)} 
                  alt="Fachada Noite 2" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Leisure: React.FC = () => {
  return (
    <section id="leisure" className="py-24 bg-[#f4f7f9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mb-4">Experiências Incomparáveis</h2>
          <div className="w-24 h-1 bg-[#a1835b] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Um clube completo com lazer premium, pensado para cada detalhe do seu bem-estar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {LEISURE_ITEMS.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-[2rem] bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex flex-col">
              <div className="aspect-[16/12] overflow-hidden">
                <img 
                  src={getDriveImageUrl(item.imageId)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-14 h-14 min-w-[3.5rem] rounded-full bg-[#f0f4f8] flex items-center justify-center text-[#1e3a5f] shadow-inner">
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#1e3a5f] uppercase tracking-wider leading-tight">
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

const FloorPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState(FLOOR_PLANS[0]);

  return (
    <section id="floorplans" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mb-4">Plantas Inteligentes</h2>
          <div className="w-24 h-1 bg-[#a1835b] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Arquitetura moderna com metragens otimizadas para o seu conforto.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FLOOR_PLANS.map((plan) => (
            <button
              key={plan.title}
              onClick={() => setSelectedPlan(plan)}
              className={`px-6 py-2 rounded-full font-bold transition-all text-sm tracking-wide ${
                selectedPlan.title === plan.title 
                ? 'bg-[#1e3a5f] text-white shadow-lg scale-105' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-inner border border-gray-100">
          <div className="flex flex-col gap-12 items-center">
            {/* Imagem em destaque no topo - Agora ocupando toda a largura para ficar o maior possível */}
            <div className="w-full bg-white p-6 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl hover:shadow-blue-900/5 transition-all flex justify-center overflow-hidden">
              <img 
                src={getDriveImageUrl(selectedPlan.imageId)} 
                alt={selectedPlan.title} 
                className="max-h-[80vh] w-full object-contain animate-fadeIn"
                key={selectedPlan.imageId} 
              />
            </div>

            {/* Informações detalhadas abaixo da planta */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
              <div>
                <h3 className="text-4xl font-black text-[#1e3a5f] mb-2 uppercase tracking-tight">{selectedPlan.title}</h3>
                <p className="text-5xl text-[#a1835b] font-bold mb-6">{selectedPlan.area}</p>
                <div className="w-20 h-2 bg-[#a1835b] mb-8 rounded-full"></div>
                <p className="text-2xl text-gray-600 font-medium leading-relaxed">{selectedPlan.description}</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-5 text-gray-700 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                    <i className="fa-solid fa-check text-xl"></i>
                  </div>
                  <span className="font-bold text-lg">Ventilação e iluminação natural</span>
                </div>
                <div className="flex items-center gap-5 text-gray-700 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shadow-inner">
                    <i className="fa-solid fa-check text-xl"></i>
                  </div>
                  <span className="font-bold text-lg">Acabamento de alto padrão</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HighlightSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-gray-100 bg-white">
          <img 
            src={getDriveImageUrl(HIGHLIGHT_IMAGE_ID)} 
            alt="Destaque Sant'Ana & Sofiatti" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-24 bg-[#f4f7f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#1e3a5f] mb-4">Galeria de Imagens</h2>
          <div className="w-24 h-1 bg-[#a1835b] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Um olhar detalhado sobre o seu futuro lar.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl aspect-video border-8 border-white">
              <img 
                src={getDriveImageUrl(item.imageId)} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                <h3 className="text-white text-2xl font-black mb-2 uppercase">{item.title}</h3>
                <p className="text-white/80 font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-[#1e3a5f] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide uppercase">Localização Privilegiada</h2>
          <div className="w-24 h-1 bg-[#a1835b] mx-auto mb-6"></div>
          <p className="opacity-80 max-w-2xl mx-auto text-xl font-light italic">
            Viva a conveniência de estar a poucos metros da Praia do Morro.
          </p>
        </div>

        {/* Imagem de Localização (Mapa/Visual) */}
        <div className="mb-20 rounded-[3.5rem] overflow-hidden shadow-2xl shadow-black/40 border-8 border-white/5 bg-white p-2">
          <img 
            src={getDriveImageUrl(LOCATION_IMAGE_ID)} 
            alt="Mapa de Localização - Sant'Ana & Sofiatti" 
            className="w-full h-auto object-cover rounded-[2.5rem]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LOCATION_POINTS.map((point, index) => (
            <div 
              key={index} 
              className="p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-500 flex flex-col items-start"
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after some time
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 5000);
  };

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-[#1e3a5f] mb-4">{FORM_CONTENT.title}</h2>
          <p className="text-gray-500 text-lg font-medium">{FORM_CONTENT.subtitle}</p>
        </div>

        <div className="bg-[#f8fbff] p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 border border-blue-50">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#1e3a5f] ml-2">
                    {FORM_CONTENT.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-8 py-5 rounded-2xl bg-white border border-blue-100 focus:border-[#a1835b] focus:ring-4 focus:ring-[#a1835b]/10 outline-none transition-all shadow-sm font-medium"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-[#1e3a5f] ml-2">
                    {FORM_CONTENT.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-8 py-5 rounded-2xl bg-white border border-blue-100 focus:border-[#a1835b] focus:ring-4 focus:ring-[#a1835b]/10 outline-none transition-all shadow-sm font-medium"
                    placeholder="(27) 99999-9999"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1e3a5f] text-white font-black py-6 px-10 rounded-2xl hover:bg-[#2a4e7c] transform transition-all active:scale-[0.98] shadow-2xl shadow-blue-900/30 tracking-[0.2em] text-sm uppercase"
              >
                {FORM_CONTENT.buttonText}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 animate-fadeIn">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <i className="fa-solid fa-check text-5xl"></i>
              </div>
              <h3 className="text-3xl font-black text-[#1e3a5f] mb-3">DADOS ENVIADOS!</h3>
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8 max-w-[250px]">
           <img 
             src={getDriveImageUrl(PRIME_AGENCY_DATA.logoDriveId)} 
             alt="Logo Prime" 
             className="w-full h-auto" 
             referrerPolicy="no-referrer" 
           />
        </div>

        {/* Texto de Apresentação */}
        <div className="max-w-4xl mb-16">
          <span className="text-[#a1835b] font-black uppercase tracking-[0.3em] text-[12px] mb-4 block">
            {PRIME_AGENCY_DATA.badge}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-[#1e3a5f] mb-8 uppercase tracking-tighter leading-tight">
            Conectando você ao melhor de Guarapari
          </h3>
          <p className="text-xl text-slate-500 leading-relaxed mb-12 max-w-5xl mx-auto">
            {PRIME_AGENCY_DATA.description}
          </p>
          <a 
            href={PRIME_AGENCY_DATA.website} 
            target="_blank" 
            className="inline-flex items-center gap-3 border-2 border-[#1e3a5f] text-[#1e3a5f] px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#1e3a5f] hover:text-white transition-all shadow-xl shadow-blue-900/5"
          >
            Visitar Site da Prime <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
          </a>
        </div>
        
        {/* Grid das Lojas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {PRIME_AGENCY_DATA.stores.map((store, idx) => (
            <div key={idx} className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 group flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={getDriveImageUrl(store.imageDriveId)} 
                  alt={store.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-left">
                  <h4 className="text-white font-black text-xl uppercase tracking-tight">{store.name}</h4>
                </div>
              </div>
              <div className="p-8 text-left flex-grow flex items-center">
                <a href={store.mapsUrl} target="_blank" className="flex items-start gap-4 group/link">
                  <i className="fa-solid fa-location-dot text-[#a1835b] shrink-0 mt-1 text-xl group-hover/link:scale-125 transition-transform"></i>
                  <p className="text-slate-600 font-bold text-base leading-tight group-hover/link:text-[#1e3a5f] transition-colors">{store.address}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-[#1e3a5f] mb-8 tracking-[0.2em] uppercase">
              {SITE_METADATA.name}
            </h3>
            <p className="text-gray-500 leading-relaxed font-medium text-base">
              {FOOTER_CONTENT.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-black text-[#1e3a5f] mb-8 uppercase tracking-[0.3em] opacity-50">Navegação</h4>
            <ul className="space-y-5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-600 hover:text-[#1e3a5f] font-bold transition-colors text-sm tracking-widest">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black text-[#1e3a5f] mb-8 uppercase tracking-[0.3em] opacity-50">Contato</h4>
            <ul className="space-y-5">
              <li className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#a1835b]">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <span className="font-bold">{CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#a1835b]">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <span className="font-bold">{CONTACT_INFO.email}</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#a1835b]">
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

      <a 
        href={CONTACT_INFO.whatsapp} 
        target="_blank"
        className="fixed bottom-10 right-10 z-50 bg-[#25d366] text-white w-16 h-16 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center ring-8 ring-green-500/10"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#a1835b] selection:text-white bg-white antialiased">
      <Navbar />
      <Hero />
      <About />
      <Leisure />
      <FloorPlans />
      <HighlightSection />
      <Gallery />
      <Location />
      <ContactForm />
      <AgencySection />
      <Footer />
    </div>
  );
};

export default App;

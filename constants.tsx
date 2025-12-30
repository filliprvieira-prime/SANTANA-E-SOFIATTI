
import React from 'react';

/**
 * UTILITY: Function to generate Google Drive image URLs from IDs.
 * Optimized with width parameter to reduce bandwidth usage.
 */
export const getDriveImageUrl = (id: string, width: number = 1200) => 
  `https://lh3.googleusercontent.com/d/${id}=w${width}`;

/**
 * DESIGN SYSTEM (Design Code)
 * Centralização de todas as regras de estilo do projeto.
 */
export const DESIGN_SYSTEM = {
  colors: {
    primary: '#1e3a5f',       // Navy Blue
    primaryLight: '#2a4e7c',
    secondary: '#a1835b',     // Sand Gold
    secondaryLight: '#c2a884',
    accent: '#0e7490',        // Ocean Cyan
    background: '#ffffff',
    surface: '#f4f7f9',
    text: {
      main: '#374151',
      light: '#6b7280',
      inverted: '#ffffff',
      heading: '#1e3a5f',
    },
    status: {
      success: '#22c55e',
      info: '#3b82f6',
    }
  },
  typography: {
    fontFamily: {
      sans: "'Montserrat', sans-serif",
      serif: "'Playfair Display', serif",
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    tracking: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.1em',
      widest: '0.2em',
      luxury: '0.3em',
    }
  },
  spacing: {
    sectionPadding: 'py-24 lg:py-32',
    container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    gutter: 'gap-8 md:gap-12',
  },
  radius: {
    small: 'rounded-xl',
    medium: 'rounded-2xl',
    large: 'rounded-[2.5rem]',
    extraLarge: 'rounded-[3.5rem]',
  },
  shadows: {
    soft: 'shadow-sm',
    medium: 'shadow-xl',
    deep: 'shadow-2xl shadow-blue-900/10',
    floating: 'shadow-2xl shadow-black/20',
  },
  transition: 'transition-all duration-300 ease-in-out',
};

export const THEME = {
  colors: {
    primary: DESIGN_SYSTEM.colors.primary,
    secondary: DESIGN_SYSTEM.colors.secondary,
    accent: DESIGN_SYSTEM.colors.accent,
    text: DESIGN_SYSTEM.colors.text.main,
    light: DESIGN_SYSTEM.colors.surface,
    primePurple: '#5B59A7',
    primePink: '#E8A2B9',
  },
  logoId: '1-0GvG_QW_v_r0R9m0_N_X-X_X_X_X_X',
};

export const SITE_METADATA = {
  name: "SANT'ANA & SOFIATTI",
  tagline: "HOME CLUB",
  fullTitle: "Sant'Ana & Sofiatti Home Club | Tofoli Empreendimentos",
};

export const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'PROJETO', href: '#about' },
  { label: 'LAZER', href: '#leisure' },
  { label: 'PLANTAS', href: '#floorplans' },
  { label: 'GALERIA', href: '#gallery' },
  { label: 'LOCALIZAÇÃO', href: '#location' },
];

export const CONTACT_INFO = {
  phone: '(27) 99999-9999',
  email: 'contato@santanasofiatti.com.br',
  instagram: '@tofoliempreendimentos',
  whatsapp: 'https://wa.me/5527999999999',
  address: 'Rua Principal, Praia do Morro, Guarapari/ES',
};

export const FORM_CONTENT = {
  title: "Ficou interessado?",
  subtitle: "Preencha os dados abaixo e nossa equipe entrará em contato com você em breve.",
  nameLabel: "Seu Nome",
  phoneLabel: "Seu Telefone",
  buttonText: "SOLICITAR CONTATO",
  successMessage: "Obrigado! Recebemos seus dados.",
};

export const FOOTER_CONTENT = {
  description: "O seu novo lar na Praia do Morro. Um projeto que une sofisticação, lazer de clube e a tranquilidade do mar.",
  copyright: "© 2025 Prime Imóveis Guarapari, CRECI: 9217-J. Todos os direitos reservados.",
};

export const HERO_CONTENT = {
  title: "SANT'ANA & SOFIATTI",
  subtitle: "HOME CLUB",
  location: "PRAIA DO MORRO - GUARAPARI/ES",
  backgroundId: '1THqpdaQE3TD9_ytTmlaCTx4uJvTNwrc6', 
  description: "Um novo lar: Casa, Clube e Mar. Mais de 1.000m² de lazer.",
};

export const ABOUT_CONTENT = {
  title: "LIBERDADE",
  subtitle: "Entre o azul do mar e o conforto de casa, o melhor da vida acontece aqui.",
  mainText: "Na Praia do Morro, o equilíbrio entre natureza e conveniência se faz presente. Com o mar a poucos passos e tudo o que importa ao redor, o Sant'Ana & Sofiatti oferece um endereço que traduz o estilo de vida de Guarapari: sol, charme e tranquilidade. Um cenário que inspira todos os dias.",
  facadeDayId: '1xMox5XdlujWJcTWgNxP8h46L8s6vjGy6',
  facadeNightId: '1vgIcoNRacVI-Ea1hFoYXEVQm9Fw3tfnS',
  facadeNight2Id: '1qg8qALp7arer-DgkZSPUhA7b1baET7pe',
};

export const HIGHLIGHT_IMAGE_ID = '14LK57iBR9qzNw9BUvWkO6GoffaiH91zw';
export const LOCATION_IMAGE_ID = '1ptBKG5o0-YpIIRgMEoAMqD4AIEt1tUVi';

export const PRIME_AGENCY_DATA = {
  badge: 'Imobiliária Especializada',
  title: 'PRIME GUARAPARI',
  description: 'Somos a Prime Imóveis Guarapari, referência no mercado imobiliário de Guarapari-ES, atuando com excelência na Praia do Morro, Centro e Enseada Azul. Oferecemos uma experiênia segura e personalizada, conectando você às melhores oportunidades para morar, investir ou viver o melhor do litoral capixaba. CRECI: 9217-J.',
  website: 'https://www.primeguarapari.com.br/',
  logoDriveId: '158XFhqXEWgT65DHXJazdA4Mp--0jbZJv',
  stores: [
    {
      name: 'Enseada Azul',
      address: 'Av. Viña Del Mar, 274',
      mapsUrl: 'https://maps.app.goo.gl/p1TH7NvaJJZVPrCD7',
      imageDriveId: '1PMFgtc-qaxA2-C-0LVnjd-4c9QCF1MwA',
    },
    {
      name: 'Centro',
      address: 'Rua Getúlio Vargas, 334',
      mapsUrl: 'https://maps.app.goo.gl/jb2kXoFBVarqoKrE8',
      imageDriveId: '1WjuA1UovsEr8zuT7YLqIjnrSwjqwcad3',
    },
    {
      name: 'Praia do Morro',
      address: 'Av. Beira Mar, 1128',
      mapsUrl: 'https://maps.app.goo.gl/ziWi98hg3rz24V3h6',
      imageDriveId: '1NJ1hRjN4S7MhuOnMiHHIbGMyHpTNOH29',
    }
  ]
};

export const LEISURE_ITEMS = [
  { id: 1, title: "PISCINA", description: "Água, horizonte e momentos inesquecíveis.", imageId: '14Q7aKMGUb2BgAOHpvnnifigzkCD4LuR_', icon: 'fa-swimming-pool' },
  { id: 3, title: "FIRE PLACE", description: "Encontros aquecidos com charme.", imageId: '1ZepyVNe5b7HRgObBjeZgudsVfSmtwLo8', icon: 'fa-fire-alt' },
  { id: 2, title: "SAUNA", description: "Calor terapêutico para desacelerar.", imageId: '1uoJvCwYfS7rUxy5pRzu2wXr1Pi3Q862-', icon: 'fa-hot-tub' },
  { id: 4, title: "SALÃO DE JOGOS", description: "Diversão sem hora para acabar.", imageId: '15NjYotSNxmti8ZexF7EppFwodOQFl_j3', icon: 'fa-gamepad' },
  { id: 5, title: "ESPAÇO GOURMET", description: "Receber bem, com sabor e estilo.", imageId: '1IoQK_eLFAy4P_82fTaFeTEYXXhDXMKE5', icon: 'fa-utensils' },
  { id: 6, title: "ESPAÇO FITNESS", description: "Corpo em movimento, mente em equilíbrio.", imageId: '1TLxbjHSngpbu17H1YwkKz-Vl2vV02uXh', icon: 'fa-dumbbell' },
  { id: 7, title: "SALÃO DE FESTAS", description: "Celebrações memoráveis em um ambiente sofisticado.", imageId: '1c6WFDubyW3NLQiTcPkczXVyp8mYt5zb-', icon: 'fa-champagne-glasses' },
  { id: 8, title: "BRINQUEDOTECA", description: "Espaço lúdico e seguro para a diversão das crianças.", imageId: '1c6WFDubyW3NLQiTcPkczXVyp8mYt5zb-', icon: 'fa-shapes' },
  { id: 9, title: "PLAYGROUND", description: "A diversão e alegria que tomam conta do espaço.", imageId: '1dv95A8dwkyFdyF_v1vvceMqzYeu_83lR', icon: 'fa-children' },
  { id: 13, title: "QUADRA DE AREIA", description: "Movimento que liberta.", imageId: '1mNOwzkb4XKzMEdqi6s6qcO_DTMBDrZ4D', icon: 'fa-volleyball-ball' },
  { id: 14, title: "BAR DA PRAIA", description: "Onde a felicidade é o ingrediente principal.", imageId: '1SBnVcvyCeDwMhdkDcUREtTfLOHy2Bgmm', icon: 'fa-cocktail' },
  { id: 15, title: "ESPAÇO PET", description: "Eles merecem o seu próprio lugar de diversão.", imageId: '1dKxtJWhxdARVR6rPt---M4TmI-1WoNI2', icon: 'fa-paw' }
];

export const GALLERY_ITEMS = [
  { id: 'g1', title: "Hall", caption: "Sofisticação e boas-vindas em cada detalhe.", imageId: '1JJUCKmOazZGKUEn8tFds1wnf099N3BX5' },
  { id: 'g2', title: "Varanda 1802", caption: "A localização privilegiada na Praia do Morro.", imageId: '1B_pofCBHtVkaiYgMlkOtpYnqgJ1suxna' },
  { id: 'g3', title: "Living Integrado", caption: "Espaços amplos para viver momentos únicos.", imageId: '1B0sZBTX0yRSTI-7dDtHT_6cqLAxJ2EzD' },
  { id: 'g4', title: "Varanda Coluna 04", caption: "O cenário perfeito para seus melhores brindes.", imageId: '1wLYzdNsnLFGMHDvdrjkdqiBNToK0-nFj' },
  { id: 'g5', title: "Suíte Coluna 05", caption: "Conforto e privacidade em um ambiente exclusivo.", imageId: '1SCCTObDQETNZlQ5_2lSYecZp5oMdMOBF' },
  { id: 'g6', title: "Cozinha Coluna 04", caption: "Ambiente especialmente pensado para você.", imageId: '1me99oO4avP5Z4-rtBfVOI8k11RJ9BR6l' }
];

export const FLOOR_PLANS = [
  { title: "Garden 01", area: "135,25 m²", description: "2 quartos sendo 1 suíte • 1 vaga", imageId: '1732W58RcYvMjZcb5L9y1g3_K_mjqnlsR' },
  { title: "Garden 02", area: "159,62 m²", description: "3 quartos sendo 3 suítes • 2 vagas", imageId: '1A5LCbrupzKPyrjDC_QEvSkNrzaTSpZs6' },
  { title: "Tipo 01", area: "77,64 m²", description: "2 quartos sendo 1 suíte • 1 vaga", imageId: '17NlPBC4H8pKE44n-1C12ZzDuiQetw9Q7' },
  { title: "Tipo 02", area: "70,10 m²", description: "2 quartos sendo 1 suíte • 1 vaga", imageId: '1z5EiuMZ8TZAhIGbNswD8RnPJkOxeKSgI' },
  { title: "Tipo 03", area: "70,77 m²", description: "2 quartos sendo 1 suíte • 1 vaga", imageId: '14am8LlZ_UR6w7RZwd2O-VUjWOLRMldgW' },
  { title: "Tipo 04", area: "119,49 m²", description: "3 quartos sendo 3 suítes • 2 vagas", imageId: '1kSgj1hKHiNO-kgMYU_W8G-BLquW92-mC' },
  { title: "Tipo 05", area: "118,12 m²", description: "3 quartos sendo 3 suítes • 2 vagas", imageId: '1obuMyG_8HcvqaJVd2gHIbrh66o-qwH3z' },
  { title: "Tipo 06", area: "69,53 m²", description: "2 quartos sendo 2 suítes • 1 vaga", imageId: '1rU1tqRvDh0D83rET6OqvvDitd_O6GIdm' },
];

export const LOCATION_POINTS = [
  { category: "LOCALIZAÇÃO PRIVILEGIADA", details: "Segunda quadra da Praia do Morro.", color: "#000000", icon: "fa-location-dot" },
  { category: "LAZER E BEM-ESTAR", details: "Proximidade de calçadões e áreas para prática de esportes.", color: "#f97316", icon: "fa-sun" },
  { category: "COMODIDADE", details: "Restaurantes, padarias e supermercados acessíveis.", color: "#06b6d4", icon: "fa-cart-shopping" },
  { category: "EDUCAÇÃO E SAÚDE", details: "Escolas e centros médicos localizados estrategicamente.", color: "#22c55e", icon: "fa-hospital" }
];

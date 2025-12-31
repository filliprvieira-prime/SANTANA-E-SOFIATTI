# 🏠 PROMPT DE REPLICAÇÃO: Landing Page Imobiliária Premium

> **Versão:** 1.1  
> **Projeto Base:** Sant'Ana & Sofiatti Home Club  
> **Data de Criação:** 30/12/2025  
> **Última Atualização:** 31/12/2025  
> **Desenvolvido para:** Prime Imóveis Guarapari

---

## 📋 ÍNDICE

1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Stack Tecnológica](#2-stack-tecnológica)
3. [Estrutura de Arquivos](#3-estrutura-de-arquivos)
4. [Firebase Setup](#4-firebase-setup)
5. [Sistema de Rastreamento Completo](#5-sistema-de-rastreamento-completo)
6. [Funcionalidades Implementadas](#6-funcionalidades-implementadas)
7. [Design System](#7-design-system)
8. [Prompt para Replicação](#8-prompt-para-replicação)
9. [Checklist de Deploy](#9-checklist-de-deploy)
10. [Customizações por Projeto](#10-customizações-por-projeto)

---

## 1. VISÃO GERAL DO PROJETO

### O que é
Landing page de alta conversão para empreendimentos imobiliários com:
- **Rastreamento completo** de comportamento do usuário
- **Identificação por código único** (6 caracteres alfanuméricos) sem solicitar telefone
- **Timeline de ações** detalhada por lead
- **Contador de visitas recorrentes**
- **Lightbox premium** para todas as imagens
- **Mapa interativo** do Google Maps (travado até interação)
- **Painel administrativo** protegido por senha
- **Integração com WhatsApp** personalizada

### Diferenciais
- 🎯 **Código único por visitante** - Identifica leads mesmo sem formulário
- 📊 **Timeline completa** - Registra TUDO que o usuário fez
- 🔄 **Visitante recorrente** - Sabe quantas vezes a pessoa voltou
- ⏱️ **Tempo por elemento** - Sabe quanto tempo ficou em cada planta/foto
- 🏆 **Score de interesse** - Calcula automaticamente nível de interesse (0-100%)

---

## 2. STACK TECNOLÓGICA

```json
{
  "frontend": {
    "framework": "React 19.2.3",
    "bundler": "Vite 6.4.1",
    "linguagem": "TypeScript",
    "estilos": "TailwindCSS (via CDN)",
    "icones": "Font Awesome 6.4.0",
    "fontes": "Google Fonts (Montserrat + Playfair Display)"
  },
  "backend": {
    "plataforma": "Firebase",
    "database": "Cloud Firestore",
    "analytics": "Firebase Analytics",
    "hosting": "Firebase Hosting"
  },
  "tracking": {
    "google": "Firebase Analytics + Google Analytics (via measurementId)",
    "meta": "Facebook/Instagram Pixel"
  }
}
```

### Dependências (package.json)
```json
{
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "firebase": "^12.7.0"
  },
  "devDependencies": {
    "@types/react": "^19.2.3",
    "@types/react-dom": "^19.2.3",
    "typescript": "^5.8.3",
    "vite": "^6.4.1"
  }
}
```

---

## 3. ESTRUTURA DE ARQUIVOS

```
projeto/
├── index.html          # HTML base + Meta Pixel + CDNs
├── index.tsx           # Entry point React
├── App.tsx             # Componentes principais + Admin Panel + Lightbox
├── constants.tsx       # Conteúdo do site (textos, imagens, contatos)
├── firebaseConfig.ts   # Firebase + Sistema de Rastreamento completo
├── firebase.json       # Configuração do Firebase Hosting
├── firestore.rules     # Regras de segurança do Firestore
├── package.json        # Dependências
├── tsconfig.json       # Configuração TypeScript
└── vite.config.ts      # Configuração Vite
```

---

## 4. FIREBASE SETUP

### 4.1 Criar Projeto no Firebase Console

1. Acesse: https://console.firebase.google.com
2. Clique "Adicionar projeto"
3. Nome do projeto: `nome-empreendimento` (ex: `santana-sofiatti`)
4. Ative Google Analytics quando perguntado
5. Selecione ou crie uma conta Analytics

### 4.2 Configurar Firebase no Projeto

1. No console, vá em "Configurações do projeto" > "Seus apps"
2. Clique no ícone "</>" (Web)
3. Registre o app com um apelido
4. Copie as credenciais para `firebaseConfig.ts`:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "projeto.firebaseapp.com",
  projectId: "projeto",
  storageBucket: "projeto.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-XXXXXXXXXX"
};
```

### 4.3 Ativar Firestore

1. No console, vá em "Build" > "Firestore Database"
2. Clique "Criar banco de dados"
3. Selecione modo de produção
4. Escolha região: `southamerica-east1` (São Paulo)

### 4.4 Configurar Regras do Firestore

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{leadId} {
      // Permitir leitura apenas autenticado (ou remover para admin via SDK)
      allow read: if true;
      // Permitir escrita de qualquer origem (o site precisa)
      allow write: if true;
    }
  }
}
```

### 4.5 Ativar Firebase Hosting

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Inicializar no projeto
firebase init hosting

# Selecionar:
# - Pasta pública: dist
# - SPA: Yes
# - Não sobrescrever index.html
```

### 4.6 firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

---

## 5. SISTEMA DE RASTREAMENTO COMPLETO

### 5.1 Código Único (Lead Code)

```typescript
// Gera código tipo "A3B7X2" - 6 caracteres alfanuméricos
// Sem I, O, 0, 1 para evitar confusão visual
const generateLeadCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code; // Código genérico sem prefixo de empreendimento
};
```

**Por que 6 caracteres?**
- 32^6 = **1.073.741.824** combinações possíveis
- Praticamente impossível de repetir
- Fácil de digitar e comunicar

### 5.2 Dados Rastreados por Sessão

```typescript
interface SessionData {
  sessionId: string;
  leadCode: string;                    // 🔑 Código único
  visitorId: string;                   // ID persistente do visitante
  startTime: number;
  
  // Navegação
  pagesViewed: string[];
  navigationClicks: string[];
  
  // Interesse em Lazer
  leisureItemsClicked: string[];
  
  // ⏱️ Tempo em Plantas (segundos por planta)
  floorPlanTimeSpent: { [planName: string]: number };
  currentFloorPlan: string | null;
  floorPlanStartTime: number | null;
  
  // ⏱️ Tempo em Fotos da Galeria
  galleryImageTimeSpent: { [imageName: string]: number };
  
  // ⏱️ Tempo em Fachadas
  facadeImageTimeSpent: { [imageName: string]: number };
  
  // Métricas gerais
  totalTimeOnSite: number;
  whatsappClicks: number;
  
  // Origem
  referrer: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  
  // Dispositivo
  device: string;         // desktop/mobile/tablet
  browser: string;
  screenSize: string;
  
  // 📜 Timeline de Ações
  timeline: TimelineEvent[];
}
```

### 5.3 Timeline de Eventos

```typescript
interface TimelineEvent {
  timestamp: number;
  action: string;      // 'page_view', 'whatsapp_click', 'floor_plan_view', etc.
  details?: string;    // Ex: "Garden 01", "Piscina"
  section?: string;    // Ex: "plantas", "lazer", "contato"
}

// Eventos rastreados:
// - session_start       → Início da sessão
// - page_view          → Visualização de página/seção
// - navigation_click   → Clique no menu
// - floor_plan_view    → Visualização de planta
// - gallery_view       → Visualização de foto da galeria
// - leisure_click      → Clique em item de lazer
// - image_view         → Visualização de imagem (fachada)
// - lightbox_open      → Abertura do lightbox premium
// - whatsapp_click     → Clique no WhatsApp
// - form_submit        → Envio do formulário
// - button_click       → Clique em botão geral
```

### 5.4 Visitante Recorrente

```typescript
interface VisitorData {
  visitorId: string;
  firstVisit: number;
  visitCount: number;    // Incrementa a cada visita (após 30min de intervalo)
  lastVisit: number;
  leadCode: string;      // Mantém o mesmo código em todas as visitas
}

// Funções exportadas:
export const getVisitCount = (): number;
export const isReturningVisitor = (): boolean;
export const getVisitorInfo = (): { visitCount, firstVisit, isReturning };
```

### 5.5 Cálculo de Score de Interesse

```typescript
const calculateInterestScore = (session: SessionData): number => {
  let score = 0;
  
  // Tempo no site (max 30 pontos)
  score += Math.min((session.totalTimeOnSite || 0) / 10, 30);
  
  // Tempo em plantas (max 25 pontos)
  const totalFloorPlanTime = Object.values(session.floorPlanTimeSpent).reduce((a,b) => a+b, 0);
  score += Math.min(totalFloorPlanTime / 5, 25);
  
  // Tempo em galeria (max 15 pontos)
  const totalGalleryTime = Object.values(session.galleryImageTimeSpent).reduce((a,b) => a+b, 0);
  score += Math.min(totalGalleryTime / 3, 15);
  
  // Itens de lazer clicados (max 15 pontos)
  score += Math.min((session.leisureItemsClicked?.length || 0) * 3, 15);
  
  // Cliques no WhatsApp (max 15 pontos)
  score += Math.min((session.whatsappClicks || 0) * 15, 15);
  
  return Math.min(Math.round(score), 100);
};
```

### 5.6 Dados Salvos no Firestore

```typescript
// Estrutura do documento salvo em /leads/{leadId}
{
  // 🔑 Identificação
  leadCode: "A3B7X2",  // 6 caracteres alfanuméricos
  sessionId: "session_1704067200000_abc123",
  visitorId: "visitor_1704000000000_xyz789",
  
  // 📝 Dados do Formulário (se preenchido)
  nomeCliente: "João Silva",
  telefoneCliente: "(27) 99999-9999",
  
  // ⏱️ Tempo
  totalTimeOnSite: 245,
  totalTimeFormatted: "4min 5s",
  
  // 🏠 Planta Preferida
  plantaMaisVista: {
    nome: "Garden 02",
    tempoSegundos: 87,
    tempoFormatado: "1min 27s"
  },
  floorPlanTimeSpent: { "Garden 01": 45, "Garden 02": 87 },
  floorPlanTimeFormatted: { "Garden 01": "45 segundos", "Garden 02": "1min 27s" },
  
  // 🖼️ Foto Preferida
  fotoMaisVista: {
    nome: "Living Integrado",
    tempoSegundos: 32,
    tempoFormatado: "32 segundos"
  },
  
  // 🏊 Interesse em Lazer
  leisureItemsClicked: ["PISCINA", "ESPAÇO GOURMET", "SAUNA"],
  
  // 📱 Dispositivo
  device: "mobile",
  browser: "Chrome",
  screenSize: "390x844",
  
  // 🔗 Origem
  referrer: "instagram.com",
  utmSource: "instagram",
  utmMedium: "stories",
  utmCampaign: "lancamento-2025",
  
  // 📜 Timeline completa
  timeline: [
    { timestamp: 1704067200000, action: "session_start", details: "Visita #1" },
    { timestamp: 1704067205000, action: "page_view", details: "home" },
    { timestamp: 1704067230000, action: "floor_plan_view", details: "Garden 01", section: "plantas" },
    { timestamp: 1704067280000, action: "leisure_click", details: "PISCINA", section: "lazer" },
    { timestamp: 1704067350000, action: "whatsapp_click", details: "footer", section: "contato" }
  ],
  
  // 🔄 Recorrência
  visitCount: 2,
  isReturningVisitor: true,
  
  // 📊 Resumo
  resumo: {
    codigo: "A3B7X2",
    nome: "João Silva",
    telefone: "(27) 99999-9999",
    tempoTotal: "4min 5s",
    plantaPreferida: "Garden 02 (1min 27s)",
    fotoPreferida: "Living Integrado (32 segundos)",
    interesseEmLazer: "PISCINA, ESPAÇO GOURMET, SAUNA",
    nivelInteresse: 78,
    origem: "instagram",
    totalVisitas: 2,
    visitanteRecorrente: "Sim"
  },
  
  // Meta
  triggerAction: "whatsapp_click_footer",
  savedAt: Timestamp
}
```

---

## 6. FUNCIONALIDADES IMPLEMENTADAS

### 6.1 Premium Lightbox

Lightbox elegante que abre ao clicar em qualquer imagem:
- ✅ Backdrop com blur e gradiente
- ✅ Animação de entrada/saída suave
- ✅ Fechar com ESC ou clique fora
- ✅ Loading spinner animado
- ✅ Badge com nome do empreendimento
- ✅ Partículas decorativas animadas

### 6.2 Mapa Interativo Google Maps

```typescript
// Características:
// - 🔒 Mapa TRAVADO enquanto pino personalizado está visível
// - Pino personalizado com logo animado + ondas de pulso
// - Ao clicar: pino desaparece + mapa é DESBLOQUEADO
// - Toggle entre mapa/satélite
// - Botão "Rota" para abrir no Google Maps
// - Info card com endereço aparece após interação

// Implementação do bloqueio:
iframe: style={{ pointerEvents: mapExpanded ? 'auto' : 'none' }}
// + Camada invisível sobre o mapa antes da interação
```

**Fluxo do usuário:**
1. Vê o mapa travado com pino personalizado animado
2. Lê "Clique para explorar"
3. Clica → Pino desaparece com animação suave
4. Mapa é desbloqueado para interação total
5. Controles de mapa/satélite/rota aparecem

### 6.3 Painel Administrativo

Acesso via `/#admin` + senha:
- ✅ Lista de leads com filtro por código
- ✅ Detalhes completos de cada lead
- ✅ Timeline visual de ações
- ✅ Score de interesse destacado
- ✅ Badge de visitante recorrente
- ✅ Tempo em cada planta/foto

### 6.4 Formulário com WhatsApp

```typescript
// Fluxo:
// 1. Usuário preenche nome e telefone
// 2. Clica "Solicitar Contato"
// 3. Sistema salva lead no Firestore
// 4. Abre WhatsApp com mensagem personalizada incluindo código
```

Mensagem do WhatsApp:
```
Olá! Sou [NOME] 👋

Tenho interesse no [NOME DO EMPREENDIMENTO]!

📱 Meu telefone: [TELEFONE]
🏷️ Código: XXXXXX

Gostaria de mais informações sobre o empreendimento.
```

---

## 7. DESIGN SYSTEM

### 7.1 Cores

```typescript
const DESIGN_SYSTEM = {
  colors: {
    primary: '#1e3a5f',       // Navy Blue (principal)
    primaryLight: '#2a4e7c',
    secondary: '#a1835b',     // Sand Gold (destaque)
    secondaryLight: '#c2a884',
    accent: '#0e7490',        // Ocean Cyan
    background: '#ffffff',
    surface: '#f4f7f9',
    text: {
      main: '#374151',
      light: '#6b7280',
      inverted: '#ffffff',
      heading: '#1e3a5f',
    }
  }
};
```

### 7.2 Tipografia

```typescript
typography: {
  fontFamily: {
    sans: "'Montserrat', sans-serif",   // Corpo do texto
    serif: "'Playfair Display', serif", // Títulos elegantes
  },
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  }
}
```

### 7.3 Espaçamentos e Bordas

```typescript
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
}
```

---

## 8. PROMPT PARA REPLICAÇÃO

### 8.1 Prompt Inicial (Copie e cole)

```
Preciso criar uma landing page imobiliária premium para um novo empreendimento.

EMPREENDIMENTO:
- Nome: [NOME DO EMPREENDIMENTO]
- Localização: [CIDADE/BAIRRO]
- Coordenadas: [LATITUDE, LONGITUDE]
- Tipo: [RESIDENCIAL/COMERCIAL]

IMOBILIÁRIA:
- Nome: [NOME DA IMOBILIÁRIA]
- WhatsApp: [NÚMERO COM DDD]
- Email: [EMAIL]
- Instagram: [ARROBA]
- CRECI: [NÚMERO]

FUNCIONALIDADES OBRIGATÓRIAS:
1. Sistema de rastreamento completo com código único por visitante (XX-XXXX)
2. Timeline de todas as ações do usuário
3. Contador de visitas recorrentes
4. Tempo em cada planta e foto
5. Score de interesse automático (0-100%)
6. Lightbox premium para imagens
7. Mapa interativo do Google Maps com pino personalizado
8. Painel administrativo com senha
9. Integração WhatsApp com código do lead
10. Firebase Analytics + Facebook Pixel

STACK:
- React 19 + TypeScript + Vite
- Firebase (Analytics + Firestore + Hosting)
- TailwindCSS via CDN
- Font Awesome para ícones

CONTEÚDO DO SITE:
- Hero: [TÍTULO + SUBTÍTULO + IMAGEM DE FUNDO]
- Sobre: [TEXTO DESCRITIVO]
- Lazer: [LISTA DE AMENIDADES COM ÍCONES]
- Plantas: [LISTA DE PLANTAS COM ÁREA E DESCRIÇÃO]
- Galeria: [LISTA DE FOTOS]
- Localização: [PONTOS DE INTERESSE]
- Contato: [FORMULÁRIO + WHATSAPP]

Preciso que o projeto tenha a mesma estrutura e funcionalidades do Sant'Ana & Sofiatti, adaptando apenas o conteúdo e identidade visual.
```

### 8.2 Checklist de Customização

Para cada novo projeto, altere:

**Em `constants.tsx`:**
- [ ] `SITE_METADATA` - Nome e tagline
- [ ] `CONTACT_INFO` - Telefone, email, Instagram, WhatsApp
- [ ] `HERO_CONTENT` - Título, subtítulo, localização, imagem
- [ ] `ABOUT_CONTENT` - Textos e imagens de fachada
- [ ] `LEISURE_ITEMS` - Lista de amenidades
- [ ] `FLOOR_PLANS` - Lista de plantas
- [ ] `GALLERY_ITEMS` - Fotos da galeria
- [ ] `LOCATION_POINTS` - Pontos de interesse
- [ ] `PRIME_AGENCY_DATA` - Dados da imobiliária

**Em `firebaseConfig.ts`:**
- [ ] `firebaseConfig` - Credenciais do novo projeto Firebase
- [ ] (Opcional) Ajustar quantidade de caracteres do código se necessário

**Em `App.tsx`:**
- [ ] Coordenadas do mapa (`lat` e `lng`)
- [ ] Senha do admin (`ADMIN_PASSWORD`)
- [ ] Textos do pino do mapa

**Em `index.html`:**
- [ ] Meta tags (título, descrição, OG)
- [ ] ID do Facebook Pixel
- [ ] Favicon (se houver)

---

## 9. CHECKLIST DE DEPLOY

### 9.1 Antes do Deploy

- [ ] Testar todas as plantas (navegação)
- [ ] Testar lightbox em todas as imagens
- [ ] Testar formulário (salva no Firestore?)
- [ ] Testar WhatsApp (abre com mensagem correta?)
- [ ] Testar mapa (pino, satélite, rota)
- [ ] Testar painel admin (login, busca, detalhes)
- [ ] Verificar console do navegador (sem erros)
- [ ] Testar em mobile
- [ ] Validar Meta Pixel no Facebook Events Manager

### 9.2 Comandos de Deploy

```bash
# Build do projeto
npm run build

# Deploy para Firebase
firebase deploy --only hosting

# Deploy de regras do Firestore
firebase deploy --only firestore:rules

# Deploy completo
firebase deploy
```

### 9.3 Após o Deploy

- [ ] Testar URL de produção
- [ ] Verificar Firebase Analytics (tempo real)
- [ ] Verificar Firestore (leads sendo salvos?)
- [ ] Testar Facebook Pixel (PageView funcionando?)
- [ ] Configurar domínio personalizado (se aplicável)

---

## 10. CUSTOMIZAÇÕES POR PROJETO

### 10.1 Código Único

O código agora é **genérico** (6 caracteres alfanuméricos sem prefixo):
```typescript
// Exemplo de códigos gerados:
// A3B7X2, K9M4NP, HJTW8C
```

Se quiser adicionar prefixo por empreendimento, altere em `firebaseConfig.ts`:
```typescript
return `${prefixo}-${code}`;  // Ex: return `PM-${code}`
```

### 10.2 Trocar Cores do Tema

Em `constants.tsx`, altere o `DESIGN_SYSTEM.colors`:
```typescript
primary: '#1e3a5f',     // Cor principal (menus, títulos)
secondary: '#a1835b',   // Cor de destaque (botões, detalhes)
```

### 10.3 Adicionar Nova Seção

1. Criar componente em `App.tsx`
2. Adicionar no array `NAV_LINKS` em `constants.tsx`
3. Adicionar tracking se necessário

### 10.4 Modificar Mensagem do WhatsApp

Em `App.tsx`, função do formulário:
```typescript
const whatsappMessage = encodeURIComponent(
  `Olá! Sou ${formData.name} 👋\n\n` +
  `Tenho interesse no [NOME DO EMPREENDIMENTO]!\n\n` +
  `📱 Meu telefone: ${formData.phone}\n` +
  `🏷️ Código: ${leadCode}\n\n` +
  `Gostaria de mais informações sobre o empreendimento.`
);
```

### 10.5 Otimizações de Espaçamento

**Espaçamentos reduzidos para melhor UX:**
```typescript
// Seção de plantas
- Container: p-4 md:p-8 lg:p-10 (reduzido de p-6 md:p-12 lg:p-16)
- Gap entre elementos: gap-8 (reduzido de gap-12)
- Altura da imagem: max-h-[70vh] (reduzido de max-h-[80vh])
- Botões para imagem: mb-6 (reduzido de mb-12)

// Banner de destaque
- Seção: py-6 (reduzido de py-12)

// Seção da imobiliária
- Seção: py-16 lg:py-20 (reduzido de py-24 lg:py-32)
```

---

## 📞 SUPORTE

Para dúvidas sobre este sistema, entre em contato:
- **Desenvolvido por:** Prime Imóveis Guarapari
- **Site base:** https://santana-sofiatti.web.app
- **Documentação:** Este arquivo

---

## 📝 CHANGELOG

### v1.1 (31/12/2025)
- ✅ Código único agora tem 6 caracteres sem prefixo (genérico)
- ✅ Mapa travado enquanto pino personalizado está visível
- ✅ Mapa só desbloqueia após interação do usuário
- ✅ **Espaçamentos otimizados** para melhor UX:
  - Seção de plantas: padding e gaps reduzidos
  - Banner de destaque: py-6 (era py-12)
  - Seção da imobiliária: py-16 lg:py-20 (era py-24 lg:py-32)
  - Altura da imagem das plantas: max-h-[70vh] (era max-h-[80vh])

### v1.0 (30/12/2025)
- ✅ Sistema completo de rastreamento
- ✅ Código único por visitante
- ✅ Timeline de ações
- ✅ Visitante recorrente
- ✅ Lightbox premium
- ✅ Mapa interativo
- ✅ Painel administrativo
- ✅ Integração WhatsApp
- ✅ Firebase Analytics
- ✅ Facebook Pixel

---

> 💡 **Dica:** Mantenha este documento atualizado conforme novas funcionalidades forem adicionadas ao projeto base.

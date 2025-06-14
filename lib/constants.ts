// Constantes para o projeto WhatsApp Analytics

// Rotas da aplicação
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  SENTIMENT: (sentiment: string) => `/dashboard/sentiment/${sentiment}`,
  GROUP: (id: string) => `/group/${encodeURIComponent(id)}`,
  PROFILE: (id: string) => `/profile/${id}`,
  PROFILES: "/profiles",
  SETTINGS: {
    TARGETS: "/settings/targets",
    TEAMS: "/settings/teams",
    SCHEDULE: "/settings/schedule",
    ALERTS: "/settings/alerts",
    USERS: "/settings/users",
  },
}

// Endpoints da API
export const API = {
  GROUPS: "/api/groups",
  USERS: "/api/users",
  MESSAGES: "/api/messages",
  METRICS: "/api/metrics",
}

// Mapeamento de sentimentos
export const SENTIMENT_MAP = {
  positive: {
    type: "positive",
    label: "Positivo",
    emoji: "😊",
    color: "#22c55e", // verde
  },
  neutral: {
    type: "neutral",
    label: "Neutro",
    emoji: "😐",
    color: "#f59e0b", // amarelo
  },
  negative: {
    type: "negative",
    label: "Negativo",
    emoji: "😠",
    color: "#ef4444", // vermelho
  },
  confused: {
    type: "confused",
    label: "Confuso",
    emoji: "🤔",
    color: "#f97316", // laranja
  },
}

// Mapeamento de velocidade de resposta
export const RESPONSE_SPEED = {
  FAST: {
    type: "fast",
    label: "Rápido",
    emoji: "⚡",
    color: "#3b82f6", // azul
    thresholdSeconds: 600, // 10 minutos
  },
  NORMAL: {
    type: "normal",
    label: "Normal",
    emoji: "🟡",
    color: "#f59e0b", // amarelo
    thresholdSeconds: 1800, // 30 minutos
  },
  SLOW: {
    type: "slow",
    label: "Lento",
    emoji: "🐢",
    color: "#ef4444", // vermelho
    thresholdSeconds: Number.POSITIVE_INFINITY,
  },
}

// Configurações de paginação
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
}

// Configurações de cache
export const CACHE = {
  TTL: 60 * 5, // 5 minutos em segundos
}

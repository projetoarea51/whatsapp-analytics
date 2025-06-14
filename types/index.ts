// Tipos básicos para o projeto WhatsApp Analytics

// Tipos de sentimento
export type SentimentType = "positive" | "neutral" | "negative" | "confused"

// Tipos de velocidade de resposta
export type ResponseSpeedType = "fast" | "normal" | "slow"

// Informações de sentimento
export interface SentimentInfo {
  type: SentimentType
  label: string
  emoji: string
  color: string
}

// Informações de velocidade de resposta
export interface ResponseSpeedInfo {
  type: ResponseSpeedType
  label: string
  emoji: string
  color: string
  thresholdSeconds: number
}

// Distribuição de sentimento
export type SentimentDistribution = {
  positive: number
  neutral: number
  negative: number
  confused: number
}

// Ponto de dor
// export interface PainPoint {
//   category: string
//   count: number
//   keywords: string[]
// }

// Atividade de mensagens
export interface MessageActivity {
  date: string
  count: number
}

// Filtros de data
export interface DateRangeFilter {
  startDate?: Date
  endDate?: Date
}

// Filtros de mensagem
export interface MessageFilters extends DateRangeFilter {
  sentiment?: SentimentType
  isStarred?: boolean
  topic?: string
  painPoint?: string
  search?: string
}

// Filtros de usuário
export interface UserFilters extends DateRangeFilter {
  isTeamMember?: boolean
  sentiment?: SentimentType
  responseSpeed?: ResponseSpeedType
  groupId?: string
  search?: string
}

// Grupo
// export interface Group {
//   id: string
//   name: string
//   type: "whatsapp"
//   description: string
//   memberCount: number
//   messageCount: number
//   avgResponseTime: string
//   createdAt: Date
//   updatedAt: Date
//   members: GroupMember[]
//   messages: Message[]
//   metrics: GroupMetrics
// }

// Métricas de grupo
export interface GroupMetrics {
  groupId: string
  sentimentDistribution: SentimentDistribution
  messageActivity: MessageActivity[]
  painPoints: PainPoint[]
}

// Usuário
// export interface User {
//   id: string
//   name: string
//   avatarUrl?: string
//   phone: string
//   email?: string
//   role: string
//   company: string
//   bio?: string
//   isTeamMember: boolean
//   createdAt: Date
//   updatedAt: Date
//   groups: GroupMember[]
//   messages: Message[]
//   metrics: UserMetrics
//   skills?: Skill[]
//   connections?: Connection[]
// }

// Métricas de usuário
export interface UserMetrics {
  userId: string
  messageCount: number
  responseRate: number
  avgResponseTime: string
  lastActive: Date
  sentiment?: SentimentType
  responseSpeed?: ResponseSpeedType
}

// Habilidade
export interface Skill {
  name: string
  level?: "Básico" | "Intermediário" | "Avançado" | "Especialista"
  endorsements?: number
}

// Conexão
export interface Connection {
  userId: string
  connectedUserId: string
  commonGroups: string[]
}

// Membro do grupo
export interface GroupMember {
  id: string
  groupId: string
  userId: string
  joinedAt: Date
  isActive: boolean
  role?: "admin" | "member"
  messageCount: number
  lastActive: Date
}

// Tipo de mensagem
export type Message = {
  id: string
  content: string
  senderId: string
  senderName: string
  groupId: string
  groupName: string
  timestamp: string
  sentiment: SentimentType
  topics?: string[]
  isMarked?: boolean
}

// Props para componentes
export interface SentimentBadgeProps {
  sentiment: SentimentType
  showEmoji?: boolean
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export interface SentimentDistributionChartProps {
  distribution?: SentimentDistribution
  data?: Array<{ name: string; value: number }>
  height?: number
  showLegend?: boolean
  showTooltip?: boolean
}

export interface SentimentWidgetProps {
  distribution: SentimentDistribution
  onSentimentClick?: (sentiment: SentimentType) => void
}

export interface ResponseSpeedBadgeProps {
  speed: ResponseSpeedType
  showEmoji?: boolean
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export interface ParticipationRankingProps {
  type: "team" | "prospects"
  groupId?: string // Se fornecido, filtra por grupo específico
  limit?: number
}

export interface UserListItemProps {
  user: User
  metrics?: UserMetrics
  showGroups?: boolean
  showMetrics?: boolean
  showSentiment?: boolean
  showResponseTime?: boolean
}

export interface PainPointsBubbleChartProps {
  painPoints: PainPoint[]
  onBubbleClick?: (category: string) => void
  selectedCategory?: string
  height?: number
}

export interface PainPointsMessageListProps {
  category?: string
  messages?: Message[]
  groupId?: string // Se fornecido, filtra por grupo específico
  limit?: number
}

export interface GroupLinkProps {
  group: Group | { id: string; name: string }
  className?: string
}

export interface GroupsListProps {
  groups: Group[]
  onGroupClick?: (groupId: string) => void
  className?: string
}

// Tipo de usuário
export type User = {
  id: string
  name: string
  type: "team" | "prospect"
  avatarUrl?: string
  role?: string
  company?: string
  phone?: string
  email?: string
  bio?: string
  skills?: string[]
  groups?: string[]
  connections?: string[]
  joinedAt?: string
  lastActive?: string
}

// Tipo de grupo
export type Group = {
  id: string
  name: string
  description?: string
  memberCount?: number
  messageCount?: number
  createdAt?: string
  lastActive?: string
  sentiment?: SentimentType
  responseSpeed?: ResponseSpeedType
}

// Tipo de dor (pain point)
export type PainPoint = {
  id: string
  name: string
  value: number
  category?: string
  count?: number
  keywords?: string[]
  messages: Message[]
}

// Estatísticas de membro da equipe
export type TeamMemberStats = {
  responseSpeed: {
    type: ResponseSpeedType
    avgTime: number
  }
  responseRate: number
  messagesPerDay: number
  activeGroups: number
  sentiment: {
    positive: number
    neutral: number
    negative: number
    confused: number
  }
}

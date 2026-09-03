export type PlanType = "team" | "scale" | "on_premises";
export type PlanStatus = "trialing" | "active" | "past_due" | "canceled";
export type UserRole = "admin" | "viewer";
export type DocumentStatus = "processing" | "indexed" | "failed";
export type DocumentSourceType = "pdf" | "docx" | "notion" | "manual";
export type ChannelType = "slack" | "telegram" | "web_playground";
export type QuestionStatus = "open" | "resolved";

export interface Tenant {
  id: string;
  name: string;
  plan: PlanType;
  plan_status: PlanStatus;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  is_on_premises: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string;
  tenant_id: string;
  email: string;
  role: UserRole;
  name?: string;
  created_at: string;
}

export interface DocumentChunk {
  id: string;
  document_id: string;
  tenant_id: string;
  chunk_index: number;
  chunk_text: string;
  embedding?: number[];
  source_url?: string;
}

export interface DocumentRecord {
  id: string;
  tenant_id: string;
  source_type: DocumentSourceType;
  title: string;
  source_url?: string;
  file_url?: string;
  status: DocumentStatus;
  chunk_count: number;
  created_at: string;
  chunks?: DocumentChunk[];
}

export interface BotChannel {
  id: string;
  tenant_id: string;
  channel_type: "slack" | "telegram";
  slack_team_id?: string;
  slack_team_name?: string;
  slack_bot_token_masked?: string;
  telegram_bot_token_masked?: string;
  telegram_bot_username?: string;
  is_active: boolean;
  connected_at: string;
}

export interface QueryLog {
  id: string;
  tenant_id: string;
  channel_type: ChannelType;
  question_text: string;
  answer_text: string;
  matched_document_ids: string[];
  relevance_score: number;
  was_answered: boolean;
  created_at: string;
}

export interface UnansweredQuestion {
  id: string;
  tenant_id: string;
  question_text: string;
  frequency: number;
  status: QuestionStatus;
  created_at: string;
  updated_at: string;
}

export interface RAGQueryResult {
  answer: string;
  was_answered: boolean;
  relevance_score: number;
  matched_chunks: Array<{
    chunk_text: string;
    document_title: string;
    document_id: string;
    score: number;
  }>;
}


// Definindo os tipos de geração suportados pela plataforma
export enum GenerationType {
  CONTRACT = 'CONTRACT',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  EDIT = 'EDIT',
  ANALYZE = 'ANALYZE'
}

// Tipos auxiliares para configuração de mídia
export type AspectRatio = "1:1" | "2:3" | "3:2" | "3:4" | "4:3" | "9:16" | "16:9" | "21:9";
export type ImageSize = "1K" | "2K" | "4K";

// Interface para configuração geral de geração de mídia
export interface GenerationConfig {
  aspectRatio: AspectRatio;
  imageSize: ImageSize;
  videoResolution: string;
  style?: string;
  appType?: string;
  techStack?: string;
  features?: string;
}

// Interface específica para configuração de geração de aplicativos
export interface AppConfig {
  appType: GenerationType;
  techStack: string;
  features: string;
}

export interface ContractDetails {
  type: string;
  parties: string;
  clauses: string;
  tone: 'formal' | 'amigável' | 'rígido';
}

export interface MediaItem {
  id: string;
  type: 'contract';
  url: string;
  prompt: string;
  timestamp: number;
}

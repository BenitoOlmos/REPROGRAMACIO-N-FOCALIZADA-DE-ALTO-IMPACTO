
export enum UserRole {
  ADMIN = 'ADMIN',
  COORDINATOR = 'COORDINATOR',
  PROFESSIONAL = 'PROFESSIONAL',
  CLIENT = 'CLIENT'
}

export enum ServiceType {
  CALMA = 'Calma',
  ANGUSTIA = 'Angustia',
  AMOR_PROPIO = 'Amor Propio',
  CULPA = 'Culpa'
}

export enum Phase {
  ONBOARDING = 1,
  EVOLUTION = 2,
  CLOSURE = 3
}

export interface PhaseConfig {
  id: Phase;
  title: string;
  description: string;
  daysToUnlock: number;
  resources: {
    guideTitle: string;
    audioTitle: string;
    meetLink?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  service?: ServiceType;
  registrationDate: Date;
  isActive: boolean;
  assignedProfessionalId?: string;
  professionalName?: string;
}

export interface TestResult {
  id: string;
  userId: string;
  phase: Phase;
  score: number; 
  responses: Record<string, any>;
  createdAt: Date;
}

export interface AudioAnalytics {
  userId: string;
  audioId: string;
  playCount: number;
  totalMinutes: number;
  daysActive: number;
  lastPlayedAt: Date;
}

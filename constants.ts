
import { PhaseConfig, Phase } from './types';

export const COLORS = {
  TURQUOISE: '#0097B2',
  CHARCOAL: '#2F2F2F',
  WHITE: '#FFFFFF',
  GRAY_LIGHT: '#F8F9FA'
};

export const PHASES: PhaseConfig[] = [
  {
    id: Phase.ONBOARDING,
    title: 'Fase 1: Onboarding',
    description: 'Inicio de tu transformación. Evaluación inicial y recursos de bienvenida.',
    daysToUnlock: 0,
    resources: {
      guideTitle: 'Guía Inicial Interactiva',
      audioTitle: 'Audio 1: Fundamentos de Calma',
      meetLink: 'https://meet.google.com/rfai-onboarding'
    }
  },
  {
    id: Phase.EVOLUTION,
    title: 'Fase 2: Evolución',
    description: 'Profundización en el proceso terapéutico y primera re-evaluación.',
    daysToUnlock: 7,
    resources: {
      guideTitle: 'Guía de Profundización 2',
      audioTitle: 'Audio 2: Reprogramación Focalizada',
    }
  },
  {
    id: Phase.CLOSURE,
    title: 'Fase 3: Cierre y Resultados',
    description: 'Consolidación de logros y análisis comparativo de evolución.',
    daysToUnlock: 14,
    resources: {
      guideTitle: 'Manual de Mantenimiento',
      audioTitle: 'Audio 3: Hacia la Autonomía',
      meetLink: 'https://meet.google.com/rfai-closure'
    }
  }
];

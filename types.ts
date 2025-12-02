export enum StepType {
  INTRO = 'INTRO',
  THEORY = 'THEORY',
  MATH_LAB = 'MATH_LAB',
  PYTHON = 'PYTHON',
  CASES = 'CASES',
  SUMMARY = 'SUMMARY',
  TUTOR = 'TUTOR'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface TrainingData {
  id: number;
  content: string;
  category: 'spam' | 'ham';
  hasKeywords: boolean;
}
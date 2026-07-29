import { Difficulty } from '../models/concept.model';

export interface DifficultyMeta {
  label: string;
  level: number;
  color: string;
}

export const DIFFICULTY_META: Record<Difficulty, DifficultyMeta> = {
  [Difficulty.BEGINNER]: { label: 'Beginner', level: 1, color: '#2e7d5b' },
  [Difficulty.INTERMEDIATE]: { label: 'Intermediate', level: 2, color: '#b98426' },
  [Difficulty.ADVANCED]: { label: 'Advanced', level: 3, color: '#ba1a1a' },
};

export const DIFFICULTY_MAX_LEVEL = 3;

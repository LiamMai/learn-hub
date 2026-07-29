export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export interface Concept {
  _id: string;
  topicId: string;
  title: string;
  shortExplain: string;
  originalQuote?: string;
  codeExample?: string;
  difficulty: Difficulty;
  createdAt: string;
  updatedAt: string;
}

export type CreateConcept = Omit<
  Concept,
  '_id' | 'createdAt' | 'updatedAt'
>;

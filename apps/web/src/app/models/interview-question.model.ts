import { Difficulty } from './concept.model';

export interface InterviewQuestion {
  _id: string;
  conceptId: string;
  question: string;
  answer: string;
  difficulty: Difficulty;
  followUps: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateInterviewQuestion = Omit<
  InterviewQuestion,
  '_id' | 'createdAt' | 'updatedAt'
>;

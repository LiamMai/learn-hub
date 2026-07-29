import { Concept } from './concept.model';

export interface Project {
  _id: string;
  title: string;
  description: string;
  stack: string[];
  repoUrl?: string;
  relatedConcepts: Concept[] | string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateProject = Omit<
  Project,
  '_id' | 'createdAt' | 'updatedAt' | 'relatedConcepts'
> & { relatedConcepts?: string[] };

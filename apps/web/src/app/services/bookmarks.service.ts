import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Difficulty } from '../models/concept.model';

export interface BookmarkedLesson {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface BookmarkedSnippet {
  id: string;
  language: string;
  filename: string;
  title: string;
  codePreview: string;
}

export interface BookmarkedQuestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  lastViewedLabel: string;
}

const STORAGE_KEY = 'devhub-bookmarks';

interface BookmarksState {
  lessons: BookmarkedLesson[];
  snippets: BookmarkedSnippet[];
  questions: BookmarkedQuestion[];
}

const DEFAULT_STATE: BookmarksState = {
  lessons: [
    {
      id: 'l1',
      title: 'Microservices Patterns',
      description: 'Saga, circuit breaker, and API gateway patterns for distributed systems.',
      tags: ['architecture', 'backend'],
    },
    {
      id: 'l2',
      title: 'Tailwind Best Practices',
      description: 'Component classes, design tokens, and avoiding utility soup.',
      tags: ['css', 'frontend'],
    },
  ],
  snippets: [
    {
      id: 's1',
      language: 'typescript',
      filename: 'debounce.ts',
      title: 'Generic Debounce Hook',
      codePreview: 'function useDebounce<T>(value: T, delay: number): T { ... }',
    },
    {
      id: 's2',
      language: 'python',
      filename: 'dfs.py',
      title: 'DFS Graph Traversal',
      codePreview: 'def dfs(graph, start, visited=None): ...',
    },
  ],
  questions: [
    {
      id: 'q1',
      title: 'Design a URL shortener',
      difficulty: Difficulty.ADVANCED,
      category: 'System Design',
      description: 'Discuss hashing strategy, storage, and read/write scaling.',
      lastViewedLabel: '2 days ago',
    },
    {
      id: 'q2',
      title: 'Explain the Virtual DOM',
      difficulty: Difficulty.INTERMEDIATE,
      category: 'React',
      description: 'Reconciliation, keys, and when it actually helps performance.',
      lastViewedLabel: '1 week ago',
    },
    {
      id: 'q3',
      title: 'SQL vs NoSQL tradeoffs',
      difficulty: Difficulty.BEGINNER,
      category: 'Databases',
      description: 'Schema flexibility versus consistency guarantees.',
      lastViewedLabel: '3 weeks ago',
    },
  ],
};

function load(): BookmarksState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function persist(state: BookmarksState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

@Injectable({ providedIn: 'root' })
export class BookmarksService {
  private readonly state = signal<BookmarksState>(load());

  getLessons(): Observable<BookmarkedLesson[]> {
    return of(this.state().lessons);
  }

  getSnippets(): Observable<BookmarkedSnippet[]> {
    return of(this.state().snippets);
  }

  getQuestions(): Observable<BookmarkedQuestion[]> {
    return of(this.state().questions);
  }

  removeLesson(id: string): Observable<void> {
    this.state.update((s) => ({ ...s, lessons: s.lessons.filter((l) => l.id !== id) }));
    persist(this.state());
    return of(void 0);
  }

  removeSnippet(id: string): Observable<void> {
    this.state.update((s) => ({ ...s, snippets: s.snippets.filter((sn) => sn.id !== id) }));
    persist(this.state());
    return of(void 0);
  }

  removeQuestion(id: string): Observable<void> {
    this.state.update((s) => ({ ...s, questions: s.questions.filter((q) => q.id !== id) }));
    persist(this.state());
    return of(void 0);
  }
}

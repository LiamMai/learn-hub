import { TopicCategory } from '../models/topic.model';

export interface CategoryMeta {
  abbrev: string;
  label: string;
  color: string;
}

export const CATEGORY_META: Record<TopicCategory, CategoryMeta> = {
  [TopicCategory.ANGULAR]: {
    abbrev: 'NG',
    label: 'Angular',
    color: 'var(--cat-angular)',
  },
  [TopicCategory.NESTJS]: {
    abbrev: 'NEST',
    label: 'NestJS',
    color: 'var(--cat-nestjs)',
  },
  [TopicCategory.MONGODB]: {
    abbrev: 'DB',
    label: 'MongoDB',
    color: 'var(--cat-mongodb)',
  },
  [TopicCategory.TYPESCRIPT]: {
    abbrev: 'TS',
    label: 'TypeScript',
    color: 'var(--cat-typescript)',
  },
  [TopicCategory.JAVASCRIPT]: {
    abbrev: 'JS',
    label: 'JavaScript',
    color: 'var(--cat-javascript)',
  },
};

/**
 * Mock-only categories shown in the DevHub designs (framework grid, recommended
 * courses) that don't exist in the real backend `TopicCategory` enum yet.
 * Used exclusively for UI-only mock content — never returned by the real API.
 */
export interface MockFrameworkMeta {
  label: string;
  color: string;
}

export const MOCK_FRAMEWORK_META: Record<string, MockFrameworkMeta> = {
  react: { label: 'React', color: 'var(--cat-react)' },
  vue: { label: 'Vue.js', color: 'var(--cat-vue)' },
  nextjs: { label: 'Next.js', color: 'var(--cat-nextjs)' },
  nodejs: { label: 'Node.js', color: 'var(--cat-nodejs)' },
};

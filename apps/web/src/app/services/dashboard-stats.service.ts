import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Streak {
  days: number;
  percentileLabel: string;
}

export interface ContinueLearning {
  title: string;
  subtitle: string;
  progress: number;
  lessonsLeft: number;
}

export interface DashboardStat {
  label: string;
  value: string;
  trendLabel?: string;
  icon?: string;
}

export interface RecommendedCourse {
  id: string;
  title: string;
  description: string;
  categoryLabel: string;
  categoryColor: string;
  durationLabel: string;
  difficultyLabel: string;
}

export interface DailyTask {
  id: string;
  label: string;
  meta: string;
  done: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  isYou?: boolean;
}

@Injectable({ providedIn: 'root' })
export class DashboardStatsService {
  getStreak(): Observable<Streak> {
    return of({ days: 12, percentileLabel: 'Top 5% this week' });
  }

  getContinueLearning(): Observable<ContinueLearning> {
    return of({
      title: 'React: Advanced Hooks',
      subtitle: 'Module 4: Performance Optimization with useMemo',
      progress: 72,
      lessonsLeft: 8,
    });
  }

  getStats(): Observable<DashboardStat[]> {
    return of([
      { label: 'Overall Progress', value: '65%', trendLabel: '+5%', icon: 'trending_up' },
      { label: 'Interview Ready', value: '40%' },
      { label: 'Topics Mastered', value: '18/50', icon: 'verified' },
      { label: 'Practice Hours', value: '124.5' },
    ]);
  }

  getRecommended(): Observable<RecommendedCourse[]> {
    return of([
      {
        id: 'nextjs-14',
        title: 'Mastering Next.js 14',
        description: 'Server components, streaming, and the new App Router architecture.',
        categoryLabel: 'Next.js',
        categoryColor: 'var(--cat-nextjs)',
        durationLabel: '12h 45m',
        difficultyLabel: 'Intermediate',
      },
      {
        id: 'ts-advanced',
        title: 'Advanced TypeScript',
        description: 'Generics, mapped types, and utility types for robust architectures.',
        categoryLabel: 'TypeScript',
        categoryColor: 'var(--cat-typescript)',
        durationLabel: '8h 20m',
        difficultyLabel: 'Expert',
      },
    ]);
  }

  getActivityHeatmap(): Observable<number[]> {
    const weeks = 52;
    const days = 7;
    const cells = Array.from({ length: weeks * days }, () => {
      const roll = Math.random();
      if (roll > 0.7) return 3;
      if (roll > 0.5) return 2;
      if (roll > 0.3) return 1;
      return 0;
    });
    return of(cells);
  }

  getDailyTasks(): Observable<DailyTask[]> {
    return of([
      { id: '1', label: 'Morning Code Katas', meta: '15 mins • Algorithms', done: true },
      { id: '2', label: 'Review React Performance', meta: '45 mins • Core Learning', done: false },
      { id: '3', label: 'System Design Mock', meta: '1h • Interview Prep', done: false },
    ]);
  }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return of([
      { rank: 1, name: 'Alex Chen', xp: 2450 },
      { rank: 8, name: 'You (Dev)', xp: 1820, isYou: true },
      { rank: 9, name: 'Sarah J.', xp: 1790 },
    ]);
  }
}

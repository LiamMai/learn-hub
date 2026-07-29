import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  DailyTask,
  DashboardStat,
  DashboardStatsService,
  LeaderboardEntry,
  RecommendedCourse,
  Streak,
  ContinueLearning,
} from '../../services/dashboard-stats.service';
import { StatCard } from '../../ui/stat-card/stat-card';
import { CourseCard } from '../../ui/course-card/course-card';
import { ChecklistItem } from '../../ui/checklist-item/checklist-item';
import { ActivityHeatmap } from '../../ui/activity-heatmap/activity-heatmap';
import { ProgressBar } from '../../ui/progress-bar/progress-bar';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, StatCard, CourseCard, ChecklistItem, ActivityHeatmap, ProgressBar],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly statsService = inject(DashboardStatsService);

  protected readonly streak = signal<Streak | null>(null);
  protected readonly continueLearning = signal<ContinueLearning | null>(null);
  protected readonly stats = signal<DashboardStat[]>([]);
  protected readonly recommended = signal<RecommendedCourse[]>([]);
  protected readonly heatmap = signal<number[]>([]);
  protected readonly dailyTasks = signal<DailyTask[]>([]);
  protected readonly leaderboard = signal<LeaderboardEntry[]>([]);

  constructor() {
    this.statsService
      .getStreak()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.streak.set(v));
    this.statsService
      .getContinueLearning()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.continueLearning.set(v));
    this.statsService
      .getStats()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.stats.set(v));
    this.statsService
      .getRecommended()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.recommended.set(v));
    this.statsService
      .getActivityHeatmap()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.heatmap.set(v));
    this.statsService
      .getDailyTasks()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.dailyTasks.set(v));
    this.statsService
      .getLeaderboard()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.leaderboard.set(v));
  }

  protected toggleTask(id: string): void {
    this.dailyTasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
}

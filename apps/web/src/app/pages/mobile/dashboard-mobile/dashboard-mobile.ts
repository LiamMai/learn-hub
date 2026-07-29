import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  DailyTask,
  DashboardStatsService,
  RecommendedCourse,
  Streak,
} from '../../../services/dashboard-stats.service';
import { CourseCard } from '../../../ui/course-card/course-card';
import { ChecklistItem } from '../../../ui/checklist-item/checklist-item';

@Component({
  selector: 'app-dashboard-mobile',
  imports: [CourseCard, ChecklistItem],
  templateUrl: './dashboard-mobile.html',
})
export class DashboardMobile {
  private readonly statsService = inject(DashboardStatsService);

  protected readonly streak = signal<Streak | null>(null);
  protected readonly progress = signal(65);
  protected readonly recommended = signal<RecommendedCourse[]>([]);
  protected readonly dailyTasks = signal<DailyTask[]>([]);

  constructor() {
    this.statsService.getStreak().pipe(takeUntilDestroyed()).subscribe((v) => this.streak.set(v));
    this.statsService
      .getRecommended()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.recommended.set(v));
    this.statsService
      .getDailyTasks()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.dailyTasks.set(v));
  }

  protected toggleTask(id: string): void {
    this.dailyTasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InterviewQuestion } from '../../../models/interview-question.model';
import { InterviewQuestionsService } from '../../../services/interview-questions.service';
import { DIFFICULTY_META, DifficultyMeta } from '../../../shared/difficulty-meta';
import { Pill } from '../../../ui/pill/pill';
import { FilterChipGroup, FilterChipOption } from '../../../ui/filter-chip-group/filter-chip-group';
import { EmptyState } from '../../../ui/empty-state/empty-state';

@Component({
  selector: 'app-interview-prep-mobile',
  imports: [Pill, FilterChipGroup, EmptyState],
  templateUrl: './interview-prep-mobile.html',
})
export class InterviewPrepMobile {
  private readonly interviewQuestionsService = inject(InterviewQuestionsService);

  protected readonly loading = signal(true);
  protected readonly selectedFilter = signal('all');
  private readonly questions = signal<InterviewQuestion[]>([]);

  protected readonly filterOptions: FilterChipOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Easy', value: 'beginner' },
    { label: 'Medium', value: 'intermediate' },
    { label: 'Hard', value: 'advanced' },
  ];

  protected readonly filtered = computed(() => {
    const filter = this.selectedFilter();
    return filter === 'all'
      ? this.questions()
      : this.questions().filter((q) => q.difficulty === filter);
  });

  constructor() {
    this.interviewQuestionsService
      .getAll()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (questions) => {
          this.questions.set(questions);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  protected difficultyMeta(question: InterviewQuestion): DifficultyMeta {
    return DIFFICULTY_META[question.difficulty];
  }
}

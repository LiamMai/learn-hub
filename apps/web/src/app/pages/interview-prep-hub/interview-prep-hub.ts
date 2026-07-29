import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { InterviewQuestion } from '../../models/interview-question.model';
import { InterviewQuestionsService } from '../../services/interview-questions.service';
import { DIFFICULTY_META, DifficultyMeta } from '../../shared/difficulty-meta';
import { DataTable, DataTableColumn } from '../../ui/data-table/data-table';
import { Pagination } from '../../ui/pagination/pagination';
import { Pill } from '../../ui/pill/pill';
import { FilterChipGroup, FilterChipOption } from '../../ui/filter-chip-group/filter-chip-group';
import { EmptyState } from '../../ui/empty-state/empty-state';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-interview-prep-hub',
  imports: [RouterLink, DataTable, Pagination, Pill, FilterChipGroup, EmptyState],
  templateUrl: './interview-prep-hub.html',
})
export class InterviewPrepHub {
  private readonly interviewQuestionsService = inject(InterviewQuestionsService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly search = signal('');
  protected readonly selectedDifficulty = signal('all');
  protected readonly page = signal(1);

  private readonly questions = signal<InterviewQuestion[]>([]);

  protected readonly columns: DataTableColumn[] = [
    { label: 'Question' },
    { label: 'Difficulty' },
    { label: 'Follow-ups' },
    { label: '' },
  ];

  protected readonly difficultyOptions: FilterChipOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  private readonly filtered = computed(() => {
    const query = this.search().trim().toLowerCase();
    const difficulty = this.selectedDifficulty();
    return this.questions().filter((q) => {
      const matchesDifficulty = difficulty === 'all' || q.difficulty === difficulty;
      const matchesQuery = !query || q.question.toLowerCase().includes(query);
      return matchesDifficulty && matchesQuery;
    });
  });

  protected readonly pagedRows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  protected readonly total = computed(() => this.filtered().length);

  constructor() {
    this.interviewQuestionsService
      .getAll()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (questions) => {
          this.questions.set(questions);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load interview questions. Is the API running?');
          this.loading.set(false);
        },
      });
  }

  protected onSearch(value: string): void {
    this.search.set(value);
    this.page.set(1);
  }

  protected onDifficultyChange(): void {
    this.page.set(1);
  }

  protected difficultyMeta(question: InterviewQuestion): DifficultyMeta {
    return DIFFICULTY_META[question.difficulty];
  }
}

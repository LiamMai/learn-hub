import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Topic } from '../../models/topic.model';
import { TopicsService } from '../../services/topics.service';
import { CATEGORY_META, MOCK_FRAMEWORK_META } from '../../shared/category-meta';
import { CourseCard } from '../../ui/course-card/course-card';
import { FilterChipGroup, FilterChipOption } from '../../ui/filter-chip-group/filter-chip-group';
import { EmptyState } from '../../ui/empty-state/empty-state';

interface GridCard {
  id: string;
  title: string;
  description?: string;
  categoryLabel: string;
  categoryColor: string;
  routerLink: string[] | string;
  isReal: boolean;
}

@Component({
  selector: 'app-learn-frameworks-overview',
  imports: [RouterLink, CourseCard, FilterChipGroup, EmptyState],
  templateUrl: './learn-frameworks-overview.html',
})
export class LearnFrameworksOverview {
  private readonly topicsService = inject(TopicsService);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly search = signal('');
  protected readonly selectedFilter = signal('all');

  private readonly topics = signal<Topic[]>([]);

  protected readonly filterOptions = computed<FilterChipOption[]>(() => {
    const labels = new Set(
      this.topics().map((t) => CATEGORY_META[t.category].label),
    );
    Object.values(MOCK_FRAMEWORK_META).forEach((m) => labels.add(m.label));
    return [
      { label: 'All Frameworks', value: 'all' },
      ...[...labels].sort().map((label) => ({ label, value: label })),
    ];
  });

  private readonly realCards = computed<GridCard[]>(() =>
    this.topics().map((topic) => {
      const meta = CATEGORY_META[topic.category];
      return {
        id: topic._id,
        title: topic.title,
        description: `${topic.tags.join(', ') || 'Core concepts'}`,
        categoryLabel: meta.label,
        categoryColor: meta.color,
        routerLink: ['/topics', topic._id, 'concepts'],
        isReal: true,
      };
    }),
  );

  private readonly mockCards = computed<GridCard[]>(() =>
    Object.entries(MOCK_FRAMEWORK_META).map(([key, meta]) => ({
      id: key,
      title: meta.label,
      description: 'Coming soon — not wired to real content yet.',
      categoryLabel: meta.label,
      categoryColor: meta.color,
      routerLink: '/coming-soon',
      isReal: false,
    })),
  );

  protected readonly cards = computed<GridCard[]>(() => {
    const all = [...this.realCards(), ...this.mockCards()];
    const query = this.search().trim().toLowerCase();
    const filter = this.selectedFilter();
    return all.filter((card) => {
      const matchesFilter = filter === 'all' || card.categoryLabel === filter;
      const matchesQuery =
        !query ||
        card.title.toLowerCase().includes(query) ||
        card.categoryLabel.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });
  });

  constructor() {
    this.topicsService
      .getAll()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (topics) => {
          this.topics.set(topics);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load frameworks. Is the API running?');
          this.loading.set(false);
        },
      });
  }

  protected onSearch(value: string): void {
    this.search.set(value);
  }
}

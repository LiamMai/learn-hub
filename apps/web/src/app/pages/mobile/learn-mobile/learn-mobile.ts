import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Topic } from '../../../models/topic.model';
import { TopicsService } from '../../../services/topics.service';
import { CATEGORY_META, MOCK_FRAMEWORK_META } from '../../../shared/category-meta';
import { CourseCard } from '../../../ui/course-card/course-card';
import { FilterChipGroup, FilterChipOption } from '../../../ui/filter-chip-group/filter-chip-group';

interface MobileCard {
  id: string;
  title: string;
  description?: string;
  categoryLabel: string;
  categoryColor: string;
  routerLink: string[] | string;
}

@Component({
  selector: 'app-learn-mobile',
  imports: [RouterLink, CourseCard, FilterChipGroup],
  templateUrl: './learn-mobile.html',
})
export class LearnMobile {
  private readonly topicsService = inject(TopicsService);

  protected readonly loading = signal(true);
  protected readonly selectedFilter = signal('all');
  private readonly topics = signal<Topic[]>([]);

  private readonly allCards = computed<MobileCard[]>(() => {
    const real = this.topics().map((topic) => {
      const meta = CATEGORY_META[topic.category];
      return {
        id: topic._id,
        title: topic.title,
        description: topic.tags.join(', ') || 'Core concepts',
        categoryLabel: meta.label,
        categoryColor: meta.color,
        routerLink: ['/topics', topic._id, 'concepts'],
      };
    });
    const mock = Object.entries(MOCK_FRAMEWORK_META).map(([key, meta]) => ({
      id: key,
      title: meta.label,
      description: 'Coming soon',
      categoryLabel: meta.label,
      categoryColor: meta.color,
      routerLink: '/coming-soon',
    }));
    return [...real, ...mock];
  });

  protected readonly filterOptions = computed<FilterChipOption[]>(() => [
    { label: 'All Frameworks', value: 'all' },
    ...[...new Set(this.allCards().map((c) => c.categoryLabel))]
      .sort()
      .map((label) => ({ label, value: label })),
  ]);

  protected readonly cards = computed<MobileCard[]>(() => {
    const filter = this.selectedFilter();
    return filter === 'all'
      ? this.allCards()
      : this.allCards().filter((c) => c.categoryLabel === filter);
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
        error: () => this.loading.set(false),
      });
  }
}

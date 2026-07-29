import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Concept } from '../../models/concept.model';
import { Topic } from '../../models/topic.model';
import { ConceptsService } from '../../services/concepts.service';
import { TopicsService } from '../../services/topics.service';
import { CATEGORY_META } from '../../shared/category-meta';
import { DIFFICULTY_META, DifficultyMeta } from '../../shared/difficulty-meta';
import { Pill } from '../../ui/pill/pill';
import { CodeBlock } from '../../ui/code-block/code-block';
import { EmptyState } from '../../ui/empty-state/empty-state';

@Component({
  selector: 'app-concepts-list',
  imports: [RouterLink, Pill, CodeBlock, EmptyState],
  templateUrl: './concepts-list.html',
})
export class ConceptsList {
  private readonly conceptsService = inject(ConceptsService);
  private readonly topicsService = inject(TopicsService);
  private readonly route = inject(ActivatedRoute);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly topic = signal<Topic | null>(null);
  protected readonly concepts = signal<Concept[]>([]);

  protected readonly categoryMeta = computed(() => {
    const topic = this.topic();
    return topic ? CATEGORY_META[topic.category] : null;
  });

  constructor() {
    const topicId = this.route.snapshot.paramMap.get('topicId');
    if (!topicId) {
      this.error.set('No topic selected.');
      this.loading.set(false);
      return;
    }
    forkJoin({
      topic: this.topicsService.getOne(topicId),
      concepts: this.conceptsService.getAll(topicId),
    })
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: ({ topic, concepts }) => {
          this.topic.set(topic);
          this.concepts.set(concepts);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load this topic. Is the API running?');
          this.loading.set(false);
        },
      });
  }

  protected difficultyMeta(concept: Concept): DifficultyMeta {
    return DIFFICULTY_META[concept.difficulty];
  }
}

import { Component, input } from '@angular/core';
import { Pill } from '../pill/pill';
import { ProgressBar } from '../progress-bar/progress-bar';

@Component({
  selector: 'app-course-card',
  imports: [Pill, ProgressBar],
  template: `
    <div
      class="group bg-surface-container-lowest border border-surface-variant rounded-2xl p-4 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="font-bold text-lg group-hover:text-primary transition-colors">
          {{ title() }}
        </h3>
        @if (categoryLabel()) {
          <app-pill [label]="categoryLabel()!" [color]="categoryColor()" />
        }
      </div>
      @if (description()) {
        <p class="text-on-surface-variant text-sm mb-3 line-clamp-2">{{ description() }}</p>
      }
      @if (progress() !== undefined) {
        <div class="space-y-1 mt-3">
          <app-progress-bar [value]="progress()!" />
          <p class="text-xs font-bold text-outline">{{ progress() }}% complete</p>
        </div>
      } @else if (meta()) {
        <div class="flex items-center gap-4 text-xs text-outline mt-3">
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">schedule</span>
            {{ meta() }}
          </span>
        </div>
      }
    </div>
  `,
})
export class CourseCard {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly categoryLabel = input<string>();
  readonly categoryColor = input<string>('var(--color-primary)');
  readonly progress = input<number>();
  readonly meta = input<string>();
}

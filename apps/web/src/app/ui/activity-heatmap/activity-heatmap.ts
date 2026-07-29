import { Component, input } from '@angular/core';

const INTENSITY_COLOR = [
  'var(--color-surface-container)',
  'color-mix(in srgb, var(--color-primary) 30%, transparent)',
  'color-mix(in srgb, var(--color-primary) 60%, transparent)',
  'var(--color-primary)',
];

@Component({
  selector: 'app-activity-heatmap',
  template: `
    <div class="grid grid-cols-[repeat(52,1fr)] gap-1">
      @for (cell of cells(); track $index) {
        <div
          class="aspect-square rounded-[2px] transition-transform duration-100 hover:scale-150 hover:relative hover:z-10"
          [style.background-color]="INTENSITY_COLOR[cell]"
        ></div>
      }
    </div>
  `,
})
export class ActivityHeatmap {
  readonly cells = input.required<number[]>();
  protected readonly INTENSITY_COLOR = INTENSITY_COLOR;
}

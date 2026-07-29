import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-700"
        [style.width.%]="value()"
        [style.background-color]="color()"
      ></div>
    </div>
  `,
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly color = input<string>('var(--color-primary)');
}

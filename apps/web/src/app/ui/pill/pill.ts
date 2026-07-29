import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pill',
  template: `
    <span
      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
      [style.background-color]="bg()"
      [style.color]="color()"
    >
      {{ label() }}
    </span>
  `,
})
export class Pill {
  readonly label = input.required<string>();
  readonly color = input<string>('var(--color-primary)');
  protected readonly bg = computed(() => `color-mix(in srgb, ${this.color()} 15%, transparent)`);
}

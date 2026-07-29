import { Component, input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
      <span class="material-symbols-outlined text-4xl text-outline mb-3">
        {{ icon() }}
      </span>
      <h3 class="font-bold text-on-surface mb-1">{{ title() }}</h3>
      @if (description()) {
        <p class="text-sm text-on-surface-variant max-w-sm">{{ description() }}</p>
      }
    </div>
  `,
})
export class EmptyState {
  readonly icon = input('inbox');
  readonly title = input.required<string>();
  readonly description = input<string>();
}

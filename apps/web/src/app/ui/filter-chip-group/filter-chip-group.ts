import { Component, input, model } from '@angular/core';

export interface FilterChipOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-chip-group',
  template: `
    <div class="flex gap-2 overflow-x-auto">
      @for (option of options(); track option.value) {
        <button
          type="button"
          (click)="selected.set(option.value)"
          class="whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors"
          [class.bg-primary]="selected() === option.value"
          [class.text-on-primary]="selected() === option.value"
          [class.bg-surface-container-high]="selected() !== option.value"
          [class.text-on-surface-variant]="selected() !== option.value"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
})
export class FilterChipGroup {
  readonly options = input.required<FilterChipOption[]>();
  readonly selected = model.required<string>();
}

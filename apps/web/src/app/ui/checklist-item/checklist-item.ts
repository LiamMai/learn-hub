import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-checklist-item',
  template: `
    <div class="flex items-center gap-3 group">
      <button
        type="button"
        (click)="toggled.emit()"
        class="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0"
        [class.border-primary-container]="!checked()"
        [class.text-transparent]="!checked()"
        [class.bg-primary-container]="checked()"
        [class.border-transparent]="checked()"
        [class.text-on-primary-container]="checked()"
      >
        <span class="material-symbols-outlined text-xs" style="font-variation-settings: 'wght' 700;">
          check
        </span>
      </button>
      <div>
        <p
          class="font-bold text-sm transition-colors"
          [class.line-through]="checked()"
          [class.opacity-50]="checked()"
        >
          {{ label() }}
        </p>
        @if (meta()) {
          <p class="text-xs text-outline">{{ meta() }}</p>
        }
      </div>
    </div>
  `,
})
export class ChecklistItem {
  readonly label = input.required<string>();
  readonly meta = input<string>();
  readonly checked = input(false);
  readonly toggled = output<void>();
}

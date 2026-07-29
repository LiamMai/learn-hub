import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  template: `
    <div
      class="bg-surface-container-lowest p-4 rounded-2xl border border-surface-variant hover:border-primary transition-colors"
    >
      <p class="text-outline text-xs font-bold uppercase mb-2">{{ label() }}</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-black text-on-surface">{{ value() }}</span>
        @if (trendLabel()) {
          <span class="text-xs font-bold text-[#1a8a2a] flex items-center gap-0.5 mb-1">
            @if (icon()) {
              <span class="material-symbols-outlined text-sm">{{ icon() }}</span>
            }
            {{ trendLabel() }}
          </span>
        } @else if (icon()) {
          <span class="material-symbols-outlined text-primary">{{ icon() }}</span>
        }
      </div>
    </div>
  `,
})
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly icon = input<string>();
  readonly trendLabel = input<string>();
}

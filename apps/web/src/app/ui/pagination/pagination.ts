import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <div class="flex items-center justify-between text-sm">
      <p class="text-outline">
        Showing {{ rangeStart() }} to {{ rangeEnd() }} of {{ total() }} results
      </p>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="p-2 rounded-lg border border-outline-variant disabled:opacity-40 hover:border-primary transition-colors"
          [disabled]="page() <= 1"
          (click)="pageChange.emit(page() - 1)"
        >
          <span class="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <span class="font-bold text-on-surface px-2">{{ page() }} / {{ pageCount() }}</span>
        <button
          type="button"
          class="p-2 rounded-lg border border-outline-variant disabled:opacity-40 hover:border-primary transition-colors"
          [disabled]="page() >= pageCount()"
          (click)="pageChange.emit(page() + 1)"
        >
          <span class="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  `,
})
export class Pagination {
  readonly page = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly total = input.required<number>();
  readonly pageChange = output<number>();

  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize())),
  );
  protected readonly rangeStart = computed(() =>
    this.total() === 0 ? 0 : (this.page() - 1) * this.pageSize() + 1,
  );
  protected readonly rangeEnd = computed(() =>
    Math.min(this.page() * this.pageSize(), this.total()),
  );
}

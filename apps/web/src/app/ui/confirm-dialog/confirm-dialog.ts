import { Component, inject } from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    @if (confirmService.request(); as req) {
      <div class="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <button
          type="button"
          aria-label="Dismiss dialog"
          (click)="confirmService.respond(false)"
          class="absolute inset-0 bg-black/40 cursor-default"
        ></button>
        <div
          class="relative bg-surface-container-lowest rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl"
        >
          <h2 class="font-bold text-lg text-on-surface">{{ req.title }}</h2>
          <p class="text-sm text-on-surface-variant">{{ req.message }}</p>
          <div class="flex justify-end gap-3">
            <button
              type="button"
              (click)="confirmService.respond(false)"
              class="px-4 py-2 rounded-xl text-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              (click)="confirmService.respond(true)"
              class="px-4 py-2 rounded-xl text-sm font-bold text-on-primary transition-colors"
              [class.bg-error]="req.danger"
              [class.bg-primary]="!req.danger"
            >
              {{ req.confirmLabel ?? 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialog {
  protected readonly confirmService = inject(ConfirmService);
}

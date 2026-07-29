import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="px-4 py-3 rounded-xl shadow-lg text-sm font-bold flex items-center gap-2 bg-surface-container-lowest border"
          [class.border-outline-variant]="toast.variant === 'info'"
          [class.text-on-surface]="toast.variant !== 'error'"
          [class.border-error]="toast.variant === 'error'"
          [class.text-error]="toast.variant === 'error'"
          role="status"
        >
          @if (toast.variant === 'success') {
            <span class="material-symbols-outlined text-[18px] text-green-500">check_circle</span>
          } @else if (toast.variant === 'error') {
            <span class="material-symbols-outlined text-[18px]">error</span>
          }
          {{ toast.message }}
        </div>
      }
    </div>
  `,
})
export class Toast {
  protected readonly toastService = inject(ToastService);
}

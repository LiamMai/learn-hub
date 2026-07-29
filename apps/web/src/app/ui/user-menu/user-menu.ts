import { Component, DestroyRef, computed, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  template: `
    <div class="flex items-center gap-2">
      @if (showName()) {
        <div class="text-right hidden sm:block">
          <p class="text-xs font-bold uppercase text-on-surface">
            {{ authService.currentUser()?.name }}
          </p>
          <p class="text-[10px] text-outline">
            {{ authService.currentUser()?.email }}
          </p>
        </div>
      }
      <div
        class="w-9 h-9 rounded-full border-2 border-primary-container bg-primary-container flex items-center justify-center text-on-primary-container text-sm font-bold shrink-0"
      >
        {{ initial() }}
      </div>
      <button
        type="button"
        (click)="onLogout()"
        title="Log out"
        class="p-2 text-on-surface-variant hover:text-error transition-all"
      >
        <span class="material-symbols-outlined text-[20px]">logout</span>
      </button>
    </div>
  `,
})
export class UserMenu {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly showName = input(true);

  protected readonly initial = computed(() => {
    const name = this.authService.currentUser()?.name;
    return name ? name.charAt(0).toUpperCase() : 'U';
  });

  protected onLogout(): void {
    this.authService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate(['/login']),
        error: () => this.router.navigate(['/login']),
      });
  }
}

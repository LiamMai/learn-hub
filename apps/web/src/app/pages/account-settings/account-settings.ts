import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmService } from '../../services/confirm.service';
import { ThemeService } from '../../services/theme.service';
import { ToastService } from '../../services/toast.service';
import { UserPreferencesService } from '../../services/user-preferences.service';
import { Toggle } from '../../ui/toggle/toggle';

@Component({
  selector: 'app-account-settings',
  imports: [ReactiveFormsModule, Toggle],
  templateUrl: './account-settings.html',
})
export class AccountSettings {
  protected readonly themeService = inject(ThemeService);
  protected readonly preferencesService = inject(UserPreferencesService);
  protected readonly authService = inject(AuthService);
  private readonly confirmService = inject(ConfirmService);
  private readonly toastService = inject(ToastService);

  protected readonly avatarInitial = computed(() => {
    const name = this.authService.currentUser()?.name;
    return name ? name.charAt(0).toUpperCase() : 'U';
  });

  protected readonly profileForm = new FormGroup({
    fullName: new FormControl(this.authService.currentUser()?.name ?? '', { nonNullable: true }),
    publicTitle: new FormControl('Level 42 Architect', { nonNullable: true }),
    bio: new FormControl('Building things and breaking things, in that order.', {
      nonNullable: true,
    }),
  });

  protected saveProfile(): void {
    this.toastService.show('Profile saved', 'success');
  }

  protected setPreference(
    key: 'reducedMotion' | 'emailDigests' | 'courseAnnouncements' | 'twoFactorAuth',
    value: boolean,
  ): void {
    this.preferencesService.set(key, value);
  }

  protected async deleteAccount(): Promise<void> {
    const confirmed = await this.confirmService.confirm({
      title: 'Delete your account?',
      message: 'This permanently removes your profile, progress, and bookmarks. This cannot be undone.',
      confirmLabel: 'Delete Account',
      danger: true,
    });
    if (confirmed) {
      this.toastService.show('Account deletion is disabled in this demo', 'info');
    }
  }
}

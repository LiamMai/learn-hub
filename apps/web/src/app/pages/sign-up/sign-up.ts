import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GoogleIdentityService } from '../../services/google-identity.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
})
export class SignUp {
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly googleIdentityService = inject(GoogleIdentityService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly submitting = signal(false);
  protected readonly showPassword = signal(false);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
  });

  protected togglePasswordVisibility(): void {
    this.showPassword.update((v) => !v);
  }

  protected async onGoogleSignUp(): Promise<void> {
    try {
      const { clientId } = await firstValueFrom(this.authService.getGoogleClientId());
      const accessToken = await this.googleIdentityService.requestAccessToken(clientId);

      this.authService
        .signInWithGoogle(accessToken)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.toastService.show('Account created! Redirecting to Dashboard...', 'success');
            this.router.navigate(['/']);
          },
          error: () => this.toastService.show('Google sign-up failed', 'error'),
        });
    } catch {
      this.toastService.show('Google sign-up failed', 'error');
    }
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);

    const { name, email, password } = this.form.getRawValue();
    this.authService
      .signUp({ name, email, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.toastService.show('Account created! Redirecting to Dashboard...', 'success');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting.set(false);
          this.toastService.show(err.error?.message ?? 'Could not create account', 'error');
        },
      });
  }
}

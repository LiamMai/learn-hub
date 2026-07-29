import { Component, model } from '@angular/core';

@Component({
  selector: 'app-toggle',
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      (click)="checked.set(!checked())"
      class="w-11 h-6 rounded-full transition-colors relative shrink-0"
      [class.bg-primary]="checked()"
      [class.bg-surface-container-high]="!checked()"
    >
      <div
        class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform"
        [class.translate-x-5]="checked()"
      ></div>
    </button>
  `,
})
export class Toggle {
  readonly checked = model(false);
}

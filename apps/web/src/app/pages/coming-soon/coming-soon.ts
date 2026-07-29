import { Component } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  template: `
    <div class="flex flex-col items-center justify-center py-32 px-6 text-center">
      <span class="material-symbols-outlined text-5xl text-outline mb-4">
        construction
      </span>
      <h1 class="text-2xl font-bold text-on-surface mb-2">Coming soon</h1>
      <p class="text-on-surface-variant max-w-sm">
        This section isn't built yet — it's part of a follow-up phase.
      </p>
    </div>
  `,
})
export class ComingSoon {}

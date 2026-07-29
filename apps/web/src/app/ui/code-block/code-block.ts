import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-block',
  template: `
    <div class="rounded-xl overflow-hidden border border-outline-variant">
      <div
        class="flex items-center justify-between px-4 py-2 bg-surface-container-high border-b border-outline-variant"
      >
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#ff5f57]"></span>
          <span class="w-3 h-3 rounded-full bg-[#febc2e]"></span>
          <span class="w-3 h-3 rounded-full bg-[#28c840]"></span>
          @if (filename()) {
            <span class="ml-2 text-xs font-code text-on-surface-variant">{{ filename() }}</span>
          }
        </div>
        <button
          type="button"
          (click)="copy()"
          class="flex items-center gap-1 text-xs font-bold transition-colors"
          [class.text-green-500]="copied()"
          [class.text-on-surface-variant]="!copied()"
        >
          <span class="material-symbols-outlined text-[16px]">
            {{ copied() ? 'check' : 'content_copy' }}
          </span>
          {{ copied() ? 'Copied!' : 'Copy Code' }}
        </button>
      </div>
      <pre class="m-0 p-4 overflow-x-auto bg-surface-container-lowest"><code class="font-code text-sm text-on-surface">{{ code() }}</code></pre>
    </div>
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly filename = input<string>();

  protected readonly copied = signal(false);
  private revertTimer?: ReturnType<typeof setTimeout>;

  protected async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    clearTimeout(this.revertTimer);
    this.revertTimer = setTimeout(() => this.copied.set(false), 2000);
  }
}

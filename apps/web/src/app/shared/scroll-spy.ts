import { DestroyRef, afterNextRender, signal } from '@angular/core';

export function createScrollSpy(sectionIds: string[], destroyRef: DestroyRef) {
  const activeId = signal<string | null>(sectionIds[0] ?? null);

  afterNextRender(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 },
    );

    elements.forEach((el) => observer.observe(el));
    destroyRef.onDestroy(() => observer.disconnect());
  });

  return activeId.asReadonly();
}

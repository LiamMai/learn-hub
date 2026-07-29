import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  PracticeChallenge,
  PracticeChallengesService,
} from '../../../services/practice-challenges.service';

@Component({
  selector: 'app-practice-mobile',
  templateUrl: './practice-mobile.html',
})
export class PracticeMobile {
  private readonly challengesService = inject(PracticeChallengesService);

  protected readonly challenge = signal<PracticeChallenge | null>(null);
  protected readonly done = signal<boolean[]>([]);

  constructor() {
    this.challengesService
      .getCurrentChallenge()
      .pipe(takeUntilDestroyed())
      .subscribe((ch) => {
        this.challenge.set(ch);
        this.done.set(ch.requirements.map(() => false));
      });
  }

  protected toggleRequirement(index: number): void {
    this.done.update((items) => items.map((v, i) => (i === index ? !v : v)));
  }
}

import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PracticeChallenge, PracticeChallengesService } from '../../services/practice-challenges.service';
import { ProgressBar } from '../../ui/progress-bar/progress-bar';

interface LogEntry {
  timestamp: string;
  type: 'System' | 'Success' | 'Log';
  message: string;
}

@Component({
  selector: 'app-practice',
  imports: [ProgressBar, NgClass],
  templateUrl: './practice.html',
})
export class Practice {
  private readonly challengesService = inject(PracticeChallengesService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly challenge = signal<PracticeChallenge | null>(null);
  protected readonly counter = signal(0);
  protected readonly running = signal(false);
  protected readonly logs = signal<LogEntry[]>([]);

  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    this.challengesService
      .getCurrentChallenge()
      .pipe(takeUntilDestroyed())
      .subscribe((challenge) => this.challenge.set(challenge));

    this.addLog('System', 'Workspace ready.');
    this.destroyRef.onDestroy(() => this.stopInterval());
  }

  protected runCode(): void {
    this.stopInterval();
    this.counter.set(0);
    this.running.set(true);
    this.addLog('Success', 'Build succeeded. Timer started.');
    let ticks = 0;
    this.intervalId = setInterval(() => {
      this.counter.update((c) => c + 1);
      ticks++;
      if (ticks % 5 === 0) {
        this.addLog('Log', `count is now ${this.counter()}`);
      }
    }, 1000);
  }

  protected pause(): void {
    this.running.set(false);
    this.stopInterval();
    this.addLog('System', 'Paused.');
  }

  protected reset(): void {
    this.stopInterval();
    this.running.set(false);
    this.counter.set(0);
    this.addLog('System', 'Reset.');
  }

  protected clearConsole(): void {
    this.logs.set([]);
    this.addLog('System', 'Console cleared.');
  }

  private stopInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private addLog(type: LogEntry['type'], message: string): void {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.logs.update((logs) => [...logs, { timestamp, type, message }]);
  }
}

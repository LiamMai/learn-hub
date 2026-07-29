import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BookmarkedLesson,
  BookmarkedQuestion,
  BookmarkedSnippet,
  BookmarksService,
} from '../../services/bookmarks.service';
import { ConfirmService } from '../../services/confirm.service';
import { ToastService } from '../../services/toast.service';
import { DIFFICULTY_META, DifficultyMeta } from '../../shared/difficulty-meta';
import { Pill } from '../../ui/pill/pill';
import { EmptyState } from '../../ui/empty-state/empty-state';

@Component({
  selector: 'app-bookmarks',
  imports: [Pill, EmptyState],
  templateUrl: './bookmarks.html',
})
export class Bookmarks {
  private readonly bookmarksService = inject(BookmarksService);
  private readonly confirmService = inject(ConfirmService);
  private readonly toastService = inject(ToastService);

  protected readonly lessons = signal<BookmarkedLesson[]>([]);
  protected readonly snippets = signal<BookmarkedSnippet[]>([]);
  protected readonly questions = signal<BookmarkedQuestion[]>([]);
  protected readonly removingIds = signal<Set<string>>(new Set());

  constructor() {
    this.bookmarksService
      .getLessons()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.lessons.set(v));
    this.bookmarksService
      .getSnippets()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.snippets.set(v));
    this.bookmarksService
      .getQuestions()
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this.questions.set(v));
  }

  protected isRemoving(id: string): boolean {
    return this.removingIds().has(id);
  }

  protected difficultyMeta(question: BookmarkedQuestion): DifficultyMeta {
    return DIFFICULTY_META[question.difficulty];
  }

  protected async removeLesson(lesson: BookmarkedLesson): Promise<void> {
    const confirmed = await this.confirmService.confirm({
      title: 'Remove bookmark?',
      message: `"${lesson.title}" will be removed from your saved lessons.`,
      confirmLabel: 'Remove',
      danger: true,
    });
    if (!confirmed) return;
    this.animateOut(lesson.id, () => {
      this.bookmarksService.removeLesson(lesson.id).subscribe(() => {
        this.lessons.set(this.lessons().filter((l) => l.id !== lesson.id));
        this.toastService.show('Lesson removed', 'success');
      });
    });
  }

  protected async removeSnippet(snippet: BookmarkedSnippet): Promise<void> {
    const confirmed = await this.confirmService.confirm({
      title: 'Remove snippet?',
      message: `"${snippet.title}" will be removed from your saved snippets.`,
      confirmLabel: 'Remove',
      danger: true,
    });
    if (!confirmed) return;
    this.animateOut(snippet.id, () => {
      this.bookmarksService.removeSnippet(snippet.id).subscribe(() => {
        this.snippets.set(this.snippets().filter((s) => s.id !== snippet.id));
        this.toastService.show('Snippet removed', 'success');
      });
    });
  }

  protected async removeQuestion(question: BookmarkedQuestion): Promise<void> {
    const confirmed = await this.confirmService.confirm({
      title: 'Remove bookmark?',
      message: `"${question.title}" will be removed from your saved questions.`,
      confirmLabel: 'Remove',
      danger: true,
    });
    if (!confirmed) return;
    this.animateOut(question.id, () => {
      this.bookmarksService.removeQuestion(question.id).subscribe(() => {
        this.questions.set(this.questions().filter((q) => q.id !== question.id));
        this.toastService.show('Question removed', 'success');
      });
    });
  }

  protected async share(title: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/bookmarks#${title}`);
      this.toastService.show(`Share link copied for: ${title}`, 'success');
    } catch {
      this.toastService.show('Could not copy link', 'error');
    }
  }

  private animateOut(id: string, then: () => void): void {
    this.removingIds.update((ids) => new Set(ids).add(id));
    setTimeout(then, 250);
  }
}

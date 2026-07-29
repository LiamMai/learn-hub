import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../ui/code-block/code-block';
import { ChecklistItem } from '../../ui/checklist-item/checklist-item';
import { createScrollSpy } from '../../shared/scroll-spy';

interface TocEntry {
  id: string;
  label: string;
}

const TOC: TocEntry[] = [
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'lifecycle', label: 'Lifecycle' },
  { id: 'common-use-cases', label: 'Common Use Cases' },
  { id: 'implementation-guide', label: 'Implementation Guide' },
  { id: 'best-practices', label: 'Best Practices' },
];

const CONTEXT_CODE = `const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}`;

@Component({
  selector: 'app-lesson-detail',
  imports: [RouterLink, CodeBlock, ChecklistItem],
  templateUrl: './lesson-detail.html',
})
export class LessonDetail {
  protected readonly toc = TOC;
  protected readonly code = CONTEXT_CODE;

  protected readonly activeSection = createScrollSpy(
    TOC.map((t) => t.id),
    inject(DestroyRef),
  );

  protected readonly checkpoint = signal([true, true, false]);

  protected toggleCheckpoint(index: number): void {
    this.checkpoint.update((items) =>
      items.map((done, i) => (i === index ? !done : done)),
    );
  }

  protected scrollToSection(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

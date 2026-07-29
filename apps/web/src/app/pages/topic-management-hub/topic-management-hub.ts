import { Component, signal } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { StatCard } from '../../ui/stat-card/stat-card';
import { ProgressBar } from '../../ui/progress-bar/progress-bar';

interface SubTopic {
  id: string;
  title: string;
  progress: number;
}

interface TreeTopic {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  questionCount: number;
  progress: number;
  recentlyUpdated?: boolean;
  locked?: boolean;
  expanded?: boolean;
  subTopics?: SubTopic[];
}

interface TreeCategory {
  id: string;
  title: string;
  questionCount: number;
  expanded: boolean;
  topics: TreeTopic[];
}

const INITIAL_TREE: TreeCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    questionCount: 64,
    expanded: true,
    topics: [
      {
        id: 'react',
        title: 'React.js',
        icon: 'bolt',
        iconColor: '#61DAFB',
        questionCount: 22,
        progress: 62,
        recentlyUpdated: true,
        expanded: true,
        subTopics: [
          { id: 'react-hooks', title: 'React Hooks & State', progress: 85 },
          { id: 'react-perf', title: 'Performance Optimization', progress: 40 },
        ],
      },
      {
        id: 'typescript',
        title: 'TypeScript',
        icon: 'code',
        iconColor: '#3178C6',
        questionCount: 18,
        progress: 78,
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Engineering',
    questionCount: 30,
    expanded: false,
    topics: [
      {
        id: 'nodejs',
        title: 'Node.js',
        icon: 'dns',
        iconColor: '#339933',
        questionCount: 14,
        progress: 65,
      },
      {
        id: 'postgres',
        title: 'PostgreSQL',
        icon: 'database',
        iconColor: '#336791',
        questionCount: 16,
        progress: 0,
        locked: true,
      },
    ],
  },
];

@Component({
  selector: 'app-topic-management-hub',
  imports: [StatCard, ProgressBar, CdkDropList, CdkDrag],
  templateUrl: './topic-management-hub.html',
})
export class TopicManagementHub {
  protected readonly categories = signal<TreeCategory[]>(INITIAL_TREE);

  protected readonly stats = [
    { label: 'Total Topics', value: '142', icon: 'category' },
    { label: 'Completed', value: '48', icon: 'verified' },
    { label: 'Updates (24h)', value: '7', icon: 'update' },
  ];

  protected toggleCategory(categoryId: string): void {
    this.categories.update((cats) =>
      cats.map((c) => (c.id === categoryId ? { ...c, expanded: !c.expanded } : c)),
    );
  }

  protected toggleTopic(categoryId: string, topicId: string): void {
    this.categories.update((cats) =>
      cats.map((c) =>
        c.id !== categoryId
          ? c
          : {
              ...c,
              topics: c.topics.map((t) =>
                t.id === topicId ? { ...t, expanded: !t.expanded } : t,
              ),
            },
      ),
    );
  }

  protected drop(categoryId: string, event: CdkDragDrop<TreeTopic[]>): void {
    this.categories.update((cats) =>
      cats.map((c) => {
        if (c.id !== categoryId) return c;
        const topics = [...c.topics];
        moveItemInArray(topics, event.previousIndex, event.currentIndex);
        return { ...c, topics };
      }),
    );
  }
}

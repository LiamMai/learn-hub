import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'topics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/topics-shell/topics-shell').then((m) => m.TopicsShell),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/topic-management-hub/topic-management-hub').then(
            (m) => m.TopicManagementHub,
          ),
      },
    ],
  },
  {
    path: 'bookmarks',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/topics-shell/topics-shell').then((m) => m.TopicsShell),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/bookmarks/bookmarks').then((m) => m.Bookmarks),
      },
    ],
  },
  {
    path: 'practice',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/practice-shell/practice-shell').then((m) => m.PracticeShell),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/practice/practice').then((m) => m.Practice),
      },
    ],
  },
  {
    path: 'm',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/mobile-shell/mobile-shell').then((m) => m.MobileShell),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/mobile/dashboard-mobile/dashboard-mobile').then(
            (m) => m.DashboardMobile,
          ),
      },
      {
        path: 'learn',
        loadComponent: () =>
          import('./pages/mobile/learn-mobile/learn-mobile').then((m) => m.LearnMobile),
      },
      {
        path: 'practice',
        loadComponent: () =>
          import('./pages/mobile/practice-mobile/practice-mobile').then(
            (m) => m.PracticeMobile,
          ),
      },
      {
        path: 'interview',
        loadComponent: () =>
          import('./pages/mobile/interview-prep-mobile/interview-prep-mobile').then(
            (m) => m.InterviewPrepMobile,
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/dashboard-shell/dashboard-shell').then(
        (m) => m.DashboardShell,
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'learn',
        loadComponent: () =>
          import('./pages/learn-frameworks-overview/learn-frameworks-overview').then(
            (m) => m.LearnFrameworksOverview,
          ),
      },
      {
        path: 'topics/:topicId/concepts',
        loadComponent: () =>
          import('./pages/concepts-list/concepts-list').then(
            (m) => m.ConceptsList,
          ),
      },
      {
        path: 'interview',
        loadComponent: () =>
          import('./pages/interview-prep-hub/interview-prep-hub').then(
            (m) => m.InterviewPrepHub,
          ),
      },
      {
        path: 'lesson',
        loadComponent: () =>
          import('./pages/lesson-detail/lesson-detail').then(
            (m) => m.LessonDetail,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/account-settings/account-settings').then(
            (m) => m.AccountSettings,
          ),
      },
      {
        path: 'coming-soon',
        loadComponent: () =>
          import('./pages/coming-soon/coming-soon').then((m) => m.ComingSoon),
      },
    ],
  },
];

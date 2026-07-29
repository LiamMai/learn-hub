export interface NavItem {
  label: string;
  icon: string;
  route: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/' },
  { label: 'Learn', icon: 'school', route: '/learn' },
  { label: 'Interview', icon: 'forum', route: '/interview' },
  { label: 'Topics', icon: 'category', route: '/topics' },
  { label: 'Practice', icon: 'terminal', route: '/practice' },
  { label: 'Bookmarks', icon: 'bookmark', route: '/bookmarks' },
  { label: 'Settings', icon: 'settings', route: '/settings' },
];

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserMenu } from '../../ui/user-menu/user-menu';

interface MobileNavItem {
  label: string;
  icon: string;
  route: string;
}

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/m/dashboard' },
  { label: 'Learn', icon: 'school', route: '/m/learn' },
  { label: 'Interview', icon: 'forum', route: '/m/interview' },
  { label: 'Practice', icon: 'terminal', route: '/m/practice' },
];

@Component({
  selector: 'app-mobile-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, UserMenu],
  templateUrl: './mobile-shell.html',
})
export class MobileShell {
  protected readonly navItems = MOBILE_NAV_ITEMS;
}

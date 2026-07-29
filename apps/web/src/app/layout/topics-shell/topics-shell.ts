import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { UserMenu } from '../../ui/user-menu/user-menu';
import { NAV_ITEMS } from '../nav-config';

@Component({
  selector: 'app-topics-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, UserMenu],
  templateUrl: './topics-shell.html',
})
export class TopicsShell {
  protected readonly navItems = NAV_ITEMS;
  protected readonly themeService = inject(ThemeService);
  readonly showUpgradeCta = input(true);
}

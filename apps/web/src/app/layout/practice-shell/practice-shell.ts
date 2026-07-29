import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { UserMenu } from '../../ui/user-menu/user-menu';
import { NAV_ITEMS } from '../nav-config';

@Component({
  selector: 'app-practice-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, UserMenu],
  templateUrl: './practice-shell.html',
})
export class PracticeShell {
  protected readonly navItems = NAV_ITEMS;
  protected readonly themeService = inject(ThemeService);
}

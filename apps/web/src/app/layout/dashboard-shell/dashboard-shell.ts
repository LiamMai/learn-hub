import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { NAV_ITEMS } from '../nav-config';

@Component({
  selector: 'app-dashboard-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard-shell.html',
})
export class DashboardShell {
  protected readonly navItems = NAV_ITEMS;
  protected readonly themeService = inject(ThemeService);
}

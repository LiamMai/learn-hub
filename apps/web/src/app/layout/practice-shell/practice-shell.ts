import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { NAV_ITEMS } from '../nav-config';

@Component({
  selector: 'app-practice-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './practice-shell.html',
})
export class PracticeShell {
  protected readonly navItems = NAV_ITEMS;
  protected readonly themeService = inject(ThemeService);
}

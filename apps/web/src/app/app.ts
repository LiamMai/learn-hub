import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './ui/toast/toast';
import { ConfirmDialog } from './ui/confirm-dialog/confirm-dialog';

@Component({
  imports: [RouterOutlet, Toast, ConfirmDialog],
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
    <app-confirm-dialog></app-confirm-dialog>
  `,
})
export class App {}

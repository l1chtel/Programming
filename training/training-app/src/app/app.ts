import { Component, signal } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { UserPage } from './user-page/user-page';
import { AccountPageComponent } from './account-page/account-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('training-app');
}

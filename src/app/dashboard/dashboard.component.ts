import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IUser } from '../models/IUser.model';

/**
 * Component representing the dashboard view.
 * Provides navigation to different user-related pages and log-out functionality.
 */
@Component({
  selector: 'app-dashboard',
  imports: [
    SplitButtonModule,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  /** Menu items displayed in the dashboard */
  menu: MenuItem[];

  /** Injected Router service for navigation */
  router = inject(Router);

  /**
   * Constructor that initializes the menu items for the dashboard.
   */
  constructor() {
    this.menu = [
      { label: 'Dashboard', icon: 'pi pi-address-book', command: () => this.dashboard() },
      { label: 'Log out', icon: 'pi pi-power-off', command: () => this.logOut() },
    ];
  }

  /**
   * Navigates to the profile page of the currently logged-in user.
   * Retrieves the current user from localStorage and navigates to their profile page.
   */
  profile(): void {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user: IUser = JSON.parse(currentUser);
      this.router.navigateByUrl(`dashboard/users/${user.id}`);
    }
  }

  /**
   * Navigates to the users list page within the dashboard.
   */
  dashboard(): void {
    this.router.navigateByUrl("dashboard/users");
  }

  /**
   * Logs out the current user and redirects them to the login page.
   * Removes the current user from localStorage.
   */
  logOut(): void {
    this.router.navigateByUrl("login");
    localStorage.removeItem('currentUser');
  }
}

import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../models/IUser.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

/**
 * Component to display a list of users.
 * Provides options to view, edit, or delete users.
 */
@Component({
  selector: 'app-user-list',
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    SkeletonModule,
    ButtonModule,
    ConfirmPopupModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {
  /** Observable that holds the list of users */
  users$: Observable<IUser[] | undefined>;

  /** Injected services */
  private router: Router = inject(Router);
  private service = inject(UserService);

  /**
   * Constructor that initializes the list of users from the user service.
   */
  constructor() {
    this.users$ = this.service.getUsers();
  }

  /**
   * Navigates to the details page of the user with the given ID.
   * @param {string} id - The ID of the user whose details should be displayed.
   */
  details(id: string): void {
    this.router.navigateByUrl(`dashboard/users/${id}`);
  }

  /**
   * Navigates to the edit page of the user with the given ID.
   * @param {string} id - The ID of the user to edit.
   */
  edit(id: string): void {
    this.router.navigateByUrl(`dashboard/users/${id}/edit`);
  }

  /**
   * Deletes the user with the specified ID.
   * @param {string} id - The ID of the user to be deleted.
   */
  deleteUser(id: string): void {
    this.service.deleteUser(Number.parseInt(id));
  }
}

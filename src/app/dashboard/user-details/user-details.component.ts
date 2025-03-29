import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IUser } from '../../models/IUser.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

/**
 * `UserDetailsComponent` displays detailed information about a user.
 * It allows admins to edit or delete a user.
 */
@Component({
  selector: 'app-user-details',
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    SkeletonModule,
    ButtonModule
  ],
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  /** The user object containing the user's details. */
  user: IUser | null = null;

  /**
   * Creates an instance of `UserDetailsComponent`.
   * @param route The ActivatedRoute service for accessing route parameters.
   * @param userService The UserService for fetching and deleting user data.
   * @param router The Router service for navigation between views.
   */
  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * On component initialization, fetches the user data based on the `id` from the route.
   */
  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.fetchUserById(userId).subscribe(user => this.user = user);
    }
  }

  /**
   * Navigates to the user edit page if the user exists.
   * Only accessible by admins.
   */
  editUser(): void {
    if (this.user) {
      this.router.navigate(['dashboard/users', this.user.id, 'edit']);
    }
  }

  /**
   * Deletes the user and redirects to the dashboard.
   * @param id The ID of the user to be deleted.
   */
  deleteUser(id: string): void {
    this.userService.deleteUser(Number.parseInt(id));

    const localData = localStorage.getItem("currentUser");
    if (localData !== null) {
      const user: IUser = JSON.parse(localData);
      
      if (user.role !== "admin") {
        this.router.navigateByUrl(`dashboard/users/${user.id}`);
      }
    }
    localStorage.removeItem("currentUser")

    this.router.navigateByUrl('dashboard');
  }
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../../models/IUser.model';

/**
 * Route guard to restrict access to admin-only routes.
 * Redirects non-admin users to their profile page and unauthenticated users to the login page.
 * 
 * @param {import('@angular/router').ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {import('@angular/router').RouterStateSnapshot} state - The router state snapshot.
 * @returns {boolean} `true` if the user is an admin, otherwise `false`.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem("currentUser");

  if (localData !== null) {
    const user: IUser = JSON.parse(localData);
    
    // Check if the user has an admin role
    if (user.role !== "admin") {
      router.navigateByUrl(`dashboard/users/${user.id}`);
      return false;
    }
    return true;
  } else {
    // Redirect unauthenticated users to login
    router.navigateByUrl('login');
    return false;
  }
};

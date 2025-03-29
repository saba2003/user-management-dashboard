import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IUser } from '../../models/IUser.model';

/**
 * Route guard to ensure users can only access their own profile or, if they are admins, any user's profile.
 * Redirects unauthorized users to the dashboard and unauthenticated users to the login page.
 * 
 * @param {ActivatedRouteSnapshot} route - The activated route snapshot, containing route parameters.
 * @returns {boolean} `true` if the user is authorized, otherwise `false`.
 */
export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const localData = localStorage.getItem("currentUser");

  if (localData !== null) {
    const user: IUser = JSON.parse(localData);

    // Admins can access any user's page
    if (user.role === 'admin') {
      return true;
    }

    // Regular users can only access their own profile
    const userIdFromRoute = Number(route.paramMap.get('id'));
    if (Number.parseInt(user.id) === userIdFromRoute) {
      return true;
    }

    // Redirect unauthorized users to the dashboard
    router.navigateByUrl('/dashboard');
    return false;
  }

  // Redirect unauthenticated users to login
  router.navigateByUrl('/login');
  return false;
};

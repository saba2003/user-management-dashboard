import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Route guard to prevent logged-in users from accessing certain routes (e.g., login or register pages).
 * Redirects authenticated users to the dashboard.
 * 
 * @param {import('@angular/router').ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {import('@angular/router').RouterStateSnapshot} state - The router state snapshot.
 * @returns {boolean} `true` if the user is not logged in, otherwise `false`.
 */
export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem("currentUser");

  if (localData !== null) {
    router.navigateByUrl('dashboard');
    return false;
  } else {
    return true;
  }
};

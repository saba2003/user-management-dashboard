import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Route guard to protect authenticated routes.
 * Redirects unauthenticated users to the login page.
 * 
 * @param {import('@angular/router').ActivatedRouteSnapshot} route - The activated route snapshot.
 * @param {import('@angular/router').RouterStateSnapshot} state - The router state snapshot.
 * @returns {boolean} `true` if the user is authenticated, otherwise `false`.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localData = localStorage.getItem("currentUser");

  if (localData !== null) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};

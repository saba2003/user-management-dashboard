import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { IUser } from '../../models/IUser.model';

export const userGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const localData = localStorage.getItem("currentUser");

  if (localData !== null) {
    const user: IUser = JSON.parse(localData);

    if (user.role === 'admin') {
      return true;
    }

    const userIdFromRoute = Number(route.paramMap.get('id'));
    if (Number.parseInt(user.id) === userIdFromRoute) {
      return true;
    }

    router.navigateByUrl('/dashboard');
    return false;
  }

  router.navigateByUrl('/login');
  return false;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const localData = localStorage.getItem("currentUser")
  if(localData !== null){
    router.navigateByUrl('dashboard');
    return false;
  } else {
    return true;
  }
};

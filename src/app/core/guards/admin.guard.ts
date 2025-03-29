import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IUser } from '../../models/IUser.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const localData = localStorage.getItem("currentUser")
  
  if(localData !== null){
    const user: IUser = JSON.parse(localData)
    if(user.role !== "admin"){
      router.navigateByUrl(`dashboard/users/${user.id}`)
      return false;
    }
    return true
  } else {
    router.navigateByUrl('login');
    return false
  }
};

import { Routes } from '@angular/router';
import { adminGuard } from '../core/guards/admin.guard';
import { userGuard } from '../core/guards/user.guard';

export const dashboardRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users', 
        loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent),
        canActivate: [adminGuard]
    },
    {
        path: 'users/:id', 
        loadComponent: () => import('./user-details/user-details.component').then(c => c.UserDetailsComponent),
        canActivate: [userGuard]
    },
    { 
        path: 'users/:id/edit', 
        loadComponent: () => import('./user-details/user-edit/user-edit.component').then(c => c.UserEditComponent),
        canActivate: [userGuard]
    },
];

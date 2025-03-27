import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: 'users', 
        loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent)
    },
    {
        path: 'users/:id', 
        loadComponent: () => import('./user-details/user-details.component').then(c => c.UserDetailsComponent)
    },
];

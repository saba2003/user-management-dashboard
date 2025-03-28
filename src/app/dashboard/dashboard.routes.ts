import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: '', 
        loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent)
    },
    {
        path: ':id', 
        loadComponent: () => import('./user-details/user-details.component').then(c => c.UserDetailsComponent)
    },
];

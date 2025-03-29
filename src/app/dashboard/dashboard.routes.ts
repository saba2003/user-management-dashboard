import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: '', 
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users', 
        loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent)
    },
    {
        path: 'users/:id', 
        loadComponent: () => import('./user-details/user-details.component').then(c => c.UserDetailsComponent)
    },
    { 
        path: 'users/:id/edit', 
        loadComponent: () => import('./user-details/user-edit/user-edit.component').then(c => c.UserEditComponent)
    },
];

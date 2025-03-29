import { Routes } from '@angular/router';
import { adminGuard } from '../core/guards/admin.guard';
import { userGuard } from '../core/guards/user.guard';

/**
 * The set of routes related to the dashboard section.
 * These routes define how users can interact with user-related components.
 * Includes guards for role-based access control.
 */
export const dashboardRoutes: Routes = [
    /**
     * Default route that redirects to the users list page.
     * This ensures the users' dashboard page is shown by default.
     */
    {
        path: '', 
        redirectTo: 'users',
        pathMatch: 'full'
    },
    /**
     * Route to the user list page.
     * Only accessible to users with the "admin" role, enforced by the adminGuard.
     */
    {
        path: 'users', 
        loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent),
        canActivate: [adminGuard]
    },
    /**
     * Route to the user details page for a specific user identified by their ID.
     * This route is accessible only to the user themselves or admins, enforced by the userGuard.
     */
    {
        path: 'users/:id', 
        loadComponent: () => import('./user-details/user-details.component').then(c => c.UserDetailsComponent),
        canActivate: [userGuard]
    },
    /** 
     * Route to the user edit page for a specific user identified by their ID.
     * This route is accessible only to the user themselves or admins, enforced by the userGuard.
     */
    { 
        path: 'users/:id/edit', 
        loadComponent: () => import('./user-details/user-edit/user-edit.component').then(c => c.UserEditComponent),
        canActivate: [userGuard]
    },
];

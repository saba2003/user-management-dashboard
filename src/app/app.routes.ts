import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { NotfoundComponent } from './core/errors/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

/**
 * The application's route configuration.
 * Defines the path structure and guards for different routes.
 */
export const routes: Routes = [
    /** 
     * Redirects the empty path to the login page.
     * When the application loads, it will redirect to the 'login' route by default.
     */
    { 
        path: "", 
        redirectTo: "login",  // Redirecting to the login page
        pathMatch: "full" 
    },

    /** 
     * Route for the login page.
     * The loggedGuard ensures that users who are already logged in are redirected to the dashboard.
     */
    { 
        path: "login", 
        component: LoginComponent,
        canActivate: [loggedGuard]  // Guard ensures logged-out users can access this route
    },

    /** 
     * Route for the registration page.
     * The loggedGuard ensures that logged-in users cannot access the register page.
     */
    { 
        path: "register", 
        component: RegisterComponent,
        canActivate: [loggedGuard]  // Guard ensures logged-out users can access this route
    },

    /** 
     * Route for the dashboard.
     * The authGuard ensures that only logged-in users can access the dashboard and its child routes.
     */
    { 
        path: "dashboard", 
        component: DashboardComponent,
        children: dashboardRoutes,  // Children routes are defined in dashboardRoutes
        canActivate: [authGuard]  // Guard ensures only authenticated users can access the dashboard
    },

    /** 
     * Catch-all route for 404 errors.
     * Redirects to the NotfoundComponent if the requested route does not exist.
     */
    { path: "**", component: NotfoundComponent },
];

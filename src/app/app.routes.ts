import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { NotfoundComponent } from './core/errors/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
    { 
        path: "", 
        redirectTo: "login",
        pathMatch: "full" 
    },
    { 
        path: "login", 
        component: LoginComponent,
        canActivate: [loggedGuard]
    },
    { 
        path: "register", 
        component: RegisterComponent,
        canActivate: [loggedGuard]
    },
    { 
        path: "dashboard", 
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [authGuard]
    },
    { path: "**", component: NotfoundComponent },
];

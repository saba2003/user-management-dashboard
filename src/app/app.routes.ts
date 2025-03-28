import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

export const routes: Routes = [
    { 
        path: "", 
        redirectTo: "login",
        pathMatch: "full" 
    },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { 
        path: "dashboard", 
        component: DashboardComponent,
        children: dashboardRoutes
    },
    { path: "**", component: LoginComponent },
];

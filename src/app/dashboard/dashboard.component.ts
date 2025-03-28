import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IUser } from '../models/IUser.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    SplitButtonModule,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menu: MenuItem[];
  router = inject(Router)

  constructor() {
    this.menu = [
      { label: 'Dashboard', icon: 'pi pi-address-book', command: () => this.dashboard() },
      { label: 'Log out', icon: 'pi pi-power-off', command: () => this.logOut() },
    ]
  }

  profile(){
    const currentUser = localStorage.getItem("currentUser")
    if(currentUser) {
      const user: IUser = JSON.parse(currentUser)
      this.router.navigateByUrl(`dashboard/users/${user.id}`);
    }
  }

  dashboard(){
    this.router.navigateByUrl("dashboard/users");
  }

  logOut(){
    this.router.navigateByUrl("login");
    localStorage.removeItem('currentUser');
  }

}

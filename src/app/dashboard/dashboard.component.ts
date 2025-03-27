import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SplitButtonModule } from 'primeng/splitbutton';

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

  constructor() {
    this.menu = [
      { label: 'Dashboard', icon: 'pi pi-address-book', command: () => this.dashboard() },
      { label: 'Log out', icon: 'pi pi-power-off', command: () => this.logOut() },
    ]
  }

  profile(){

  }

  dashboard(){
    
  }

  logOut(){

  }

}

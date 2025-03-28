import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-notfound',
  imports: [ButtonModule],
  templateUrl: './notfound.component.html'
})
export class NotfoundComponent {
  private router: Router = inject(Router);

  dashboard(){
    this.router.navigateByUrl("dashboard")
  }
}

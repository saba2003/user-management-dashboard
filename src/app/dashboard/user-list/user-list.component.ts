import { Component, inject, input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../models/IUser.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-user-list',
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    SkeletonModule,
    ButtonModule,
    ConfirmPopupModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users$: Observable<IUser[] | undefined>;
  private router: Router = inject(Router)

  constructor(service: UserService){
    this.users$ = service.getUsers();
  }

  details(id: string){
    this.router.navigateByUrl(`dashboard/users/${id}`);
  }
}

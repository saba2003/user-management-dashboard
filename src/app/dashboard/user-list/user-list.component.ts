import { Component, inject, Signal, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUser } from '../../models/IUser.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-list',
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    SkeletonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: Signal<IUser[] | undefined> = signal(undefined);
  private userService = inject(UserService)

  constructor(){
    this.users = toSignal(this.userService.fetchUsers());
  }
}

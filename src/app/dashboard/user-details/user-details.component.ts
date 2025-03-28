import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IUser } from '../../models/IUser.model';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-details',
  imports: [
    RouterModule,
    CommonModule,
    CardModule,
    SkeletonModule,
    ButtonModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: IUser | null = null;

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.fetchUserById(userId).subscribe(user => this.user = user);
    }
  }

  async deleteUser(id: string){
    this.userService.deleteUser(Number.parseInt(id));
    this.router.navigateByUrl('dashboard');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IUser } from '../models/IUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private users$ = new BehaviorSubject<IUser[]>([]);

  usersSubscription: Subscription;

  constructor(private http: HttpClient){
    this.usersSubscription = timer(0, 5000).pipe(
      switchMap(() => this.fetchUsers()),
      tap(console.log)
    ).subscribe((users: IUser[]) => this.users$.next(users))
  }

  private fetchUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(users => this.users$.next(users))
    );
  }

  fetchUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`)
  }

  getUsers(): Observable<IUser[]> {
    return this.users$.asObservable()
  }

  deleteUser(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe()
  }
}

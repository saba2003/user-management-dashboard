import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../models/IUser.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private usersSubject = new BehaviorSubject<IUser[]>([]);
  private http = inject(HttpClient)

  users$ = this.usersSubject.asObservable();

  fetchUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  fetchUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`)
  }
}

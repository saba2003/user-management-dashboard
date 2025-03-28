import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, switchMap, tap } from 'rxjs';
import { IUser, User } from '../../models/IUser.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';
  private http = inject(HttpClient)

  registerUser(newUser: User): Observable<User> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${newUser.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('Email already exists');
        }
        return newUser;
      }),
      switchMap(() => this.http.post<User>(this.apiUrl, newUser)),
      tap(user => console.log('User registered:', user)),
      catchError(error => throwError(() => error))
    );
  }

  login(email: string): Observable<IUser> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('User not found');
        }
        const user = users[0];
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }),
      catchError(error => throwError(() => error))
    );
  }
}

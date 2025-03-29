import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, switchMap, tap, of } from 'rxjs';
import { IUser, User } from '../../models/IUser.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private http = inject(HttpClient);
  private router = inject(Router);

  /**
   * Registers a new user by checking if the email already exists and then adding the user.
   * @param {User} newUser - The new user to register.
   * @returns {Observable<User>} An observable that emits the registered user.
   */
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

  /**
   * Logs in a user by validating email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Observable<IUser>} An observable that emits the authenticated user.
   * @throws Error if the user is not found or the password is incorrect.
   */
  login(email: string, password: string): Observable<IUser> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('User not found');
        }
        const user = users[0];
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }),
      catchError(error => throwError(() => error))
    );
  }

  /**
   * Navigates to a specified URL.
   * @param {string} url - The URL to navigate to.
   */
  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  /**
   * Retrieves the total count of users in the system.
   * @returns {Observable<number>} An observable that emits the number of users.
   */
  getUserCount(): Observable<number> {
    return this.http.get<IUser[]>(`${this.apiUrl}`).pipe(
      map(users => users.length),
      catchError(error => {
        console.error("Error fetching users:", error);
        return of(0);
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, throwError, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { IUser } from '../models/IUser.model';

/**
 * Service responsible for managing users in the application.
 * Provides methods for fetching, updating, and deleting users.
 * Also maintains a BehaviorSubject to track the current list of users.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users';  /** API base URL for users */
  private users$ = new BehaviorSubject<IUser[]>([]); /** Observable of current users */

  usersSubscription: Subscription;  /** Subscription to refresh the user list periodically */

  /**
   * Initializes the user service.
   * Starts a timer that fetches the user list every 5 seconds.
   * @param http - HttpClient instance used for API requests.
   */
  constructor(private http: HttpClient){
    this.usersSubscription = timer(0, 5000).pipe(
      switchMap(() => this.fetchUsers()),
      tap(console.log) // Logs the fetched users to the console
    ).subscribe((users: IUser[]) => this.users$.next(users));
  }

  /**
   * Fetches the list of all users from the API.
   * @returns Observable of IUser[] - The list of users.
   */
  private fetchUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(users => this.users$.next(users)) // Updates the users$ observable with the fetched users
    );
  }

  /**
   * Fetches a user by their ID from the API.
   * @param id - The ID of the user to fetch.
   * @returns Observable of IUser - The user data.
   */
  fetchUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  /**
   * Gets the current list of users.
   * @returns Observable of IUser[] - The list of current users.
   */
  getUsers(): Observable<IUser[]> {
    return this.users$.asObservable();
  }

  /**
   * Updates a user's information.
   * @param updatedUser - The user data to update.
   * @returns Observable of IUser - The updated user data.
   */
  updateUser(updatedUser: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${updatedUser.id}`, updatedUser).pipe(
      tap(user => console.log('User updated:', user)),
      catchError(error => throwError(() => error)) // Handles errors by rethrowing them
    );
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   */
  deleteUser(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(); // Sends delete request and ignores the response
  }
}

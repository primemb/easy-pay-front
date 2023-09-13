import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, catchError, tap, take } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  tokeExpiresIn: number;
  refreshTokenExpiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private readonly httpClient: HttpClient) {}

  login(username: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(`${environment.apiUrl}/admin/auth/login`, {
        username,
        password,
      })
      .pipe(
        take(1),
        catchError(this.handleError),
        tap({
          next: (response: AuthResponseData) => {
            this.handleAuthentication(response);
          },
        })
      );
  }

  private handleAuthentication(response: AuthResponseData) {
    console.log(response);
    const expirationDate = new Date(
      new Date().getTime() + response.tokeExpiresIn * 1000
    );
    const refreshTokenExpirationDate = new Date(
      new Date().getTime() + response.refreshTokenExpiresIn * 1000
    );
    const user = new User(
      response.accessToken,
      response.refreshToken,
      expirationDate,
      refreshTokenExpirationDate
    );
    this.user.next(user);
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      message = error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      message = error.error.message;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(message));
  }
}

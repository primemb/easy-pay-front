import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, catchError, tap, take } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  tokeExpiresIn: number;
  refreshTokenExpiresIn: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: NodeJS.Timeout | null = null;
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  login(username: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(`${environment.apiUrl}/admin/auth/login`, {
        username,
        password,
      })
      .pipe(
        catchError(this.handleError),
        tap({
          next: (response: AuthResponseData) => {
            this.handleAuthentication(response);
          },
        })
      );
  }

  autoLogin() {
    const storageData = localStorage.getItem('userData');
    if (!storageData) return;
    const userData: {
      accessToken: string;
      refreshToken: string;
      tokeExpiresIn: string;
      refreshTokenExpiresIn: string;
    } = JSON.parse(storageData);
    const loadedUser = new User(
      userData.accessToken,
      userData.refreshToken,
      new Date(userData.tokeExpiresIn),
      new Date(userData.refreshTokenExpiresIn)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        loadedUser.tokenExpirationDate.getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(response: AuthResponseData) {
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

    localStorage.setItem(
      'userData',
      JSON.stringify({
        accessToken: user.token,
        refreshToken: user.refreshToken,
        tokeExpiresIn: user.tokenExpirationDate.toISOString(),
        refreshTokenExpiresIn: user.refreshTokenExpirationDate.toISOString(),
      })
    );
    this.autoLogout(response.tokeExpiresIn * 1000);
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

  public isLoggedIn(currentUser: User | null) {
    if (!currentUser) {
      return false;
    }
    if (
      !currentUser.tokenExpirationDate ||
      new Date() > currentUser.tokenExpirationDate
    ) {
      if (
        !currentUser.refreshTokenExpirationDate ||
        new Date() > currentUser.refreshTokenExpirationDate
      ) {
        return false;
      }
    }
    return !!currentUser.token;
  }
}

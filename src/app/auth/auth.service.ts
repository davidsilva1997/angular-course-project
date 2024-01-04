import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuxEJ1qaS8zG2MaUs78QoBfbdr9ndf0ik',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuxEJ1qaS8zG2MaUs78QoBfbdr9ndf0ik',
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An error occurred!';

        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many attempts! Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalid login credentials.';
                break;
        }

        return throwError(errorMessage);
    }
}
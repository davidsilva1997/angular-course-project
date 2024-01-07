import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

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
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) { }

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
            .pipe(
                catchError(this.handleError),
                tap(responseData => {
                    this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
                })
            );
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
            .pipe(
                catchError(this.handleError),
                tap(responseData => {
                    this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
                })
            );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExperiationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExperiationDate));

        if (loadedUser.token){
            this.user.next(loadedUser);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
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

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(email, userId, token, expirationDate);

        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }
}
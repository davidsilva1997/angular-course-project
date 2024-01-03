import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiEndpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuxEJ1qaS8zG2MaUs78QoBfbdr9ndf0ik'

    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                this.apiEndpoint,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(error => {
                let errorMessage = 'An error occurred!';

                if (!error.error || !error.error.error) {
                    return throwError(errorMessage);
                }

                switch (error.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMessage = 'This email already exists!';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = 'Too many attempts! Try again later.';
                        break;
                    default:
                        errorMessage = 'An error occurred!';
                }

                return throwError(errorMessage);
            }))
    }
}
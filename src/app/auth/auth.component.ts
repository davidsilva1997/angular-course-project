import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'auth-component',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertPlaceholder: PlaceholderDirective;
    private closeSubscription: Subscription;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnDestroy(): void {
        if (this.closeSubscription) {
            this.closeSubscription.unsubscribe();
        }
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading = true;

        this.isLoginMode ? (authObservable = this.authService.login(email, password)) : (authObservable = this.authService.signUp(email, password));

        authObservable.subscribe(
            response => {
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error => {
                console.log(error);
                this.error = error;
                this.showErrorAlert(error);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const hostViewContainerRef = this.alertPlaceholder.viewContainerRef;

        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);

        componentRef.instance.message = message;
        this.closeSubscription = componentRef.instance.close.subscribe(() => {
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}
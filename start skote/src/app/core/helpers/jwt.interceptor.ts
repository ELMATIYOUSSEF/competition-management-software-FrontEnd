import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Subject, Observable, throwError } from "rxjs";
import { catchError, switchMap, tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';
import { authUtils } from "../../authUtils";
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService , private router: Router ) { }

    refreshTokenInProgress = false;
    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    injectAccessToken(request) {
        const accessToken = authUtils.currentAccessToken();
        console.log(accessToken);
        if (accessToken) {
            const newReq = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
            return newReq;
        }   
        return request;
    }
    
    refreshToken(): Observable<any> {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                const subscription = this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
                // Clean up subscription when Observable is unsubscribed
                return () => subscription.unsubscribe();
            });
        } else {
            this.refreshTokenInProgress = true;
            const refreshToken = this.authenticationService.getRefreshToken();
            return  this.authenticationService.refreshToken(refreshToken).pipe(
                tap(() => {
                    this.refreshTokenInProgress = false;
                    this.tokenRefreshedSource.next();
                }),
                catchError(error => {
                    this.refreshTokenInProgress = false;
                    this.authenticationService.logout();
                    return throwError(error); 
                })
            );
        }
    }


    handleResponseError(error, request?, next?) {
        // Business error
        if (error.status === 400) {
            const errorMessage = 'There was a business-related error. Please try again.';
            this.showErrorMessage(errorMessage);
        }

        // Invalid token error
        else if (error.status === 401) {
            return this.refreshToken().pipe(
                switchMap(() => {
                    request = this.injectAccessToken(request);
                    return next.handle(request);
                }),
                catchError(e => {
                    if (e.status !== 401) {
                        return this.handleResponseError(e);
                    } else {
                        this.authenticationService.logout();
                        const errorMessage = 'Your session has expired. Please log in again.';
                        this.showErrorMessage(errorMessage);
                        return throwError(e);
                    }
                }));
        }

        // Access denied error
        else if (error.status === 403) {
            const errorMessage = 'Access denied. You do not have permission to access this resource.';
            this.showErrorMessage(errorMessage);
            this.authenticationService.logout();
        }

        // Server error
        else if (error.status === 500) {
            const errorMessage = 'An internal server error occurred. Please try again later.';
            this.showErrorMessage(errorMessage);
        }

        // Maintenance error
        else if (error.status === 503) {
            const errorMessage = 'The server is currently undergoing maintenance. Please try again later.';
            this.showErrorMessage(errorMessage);
        }

        return throwError(error);
    }

    showErrorMessage(message: string) {
        console.error(message);
    }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
   
        // add authorization header with jwt token if available
        if (request.url.includes('api/v1/auth')) return next.handle(request);
        
        // Handle request
       request = this.injectAccessToken(request);
        // Handle response
        return next.handle(request).pipe(catchError((error) => {
            return this.handleResponseError(error, request, next);
        }));
        
    }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                catchError(err => {
                    if (err.status === 401) {
                        const refreshToken = this.authenticationService.getRefreshToken();
                        this.authenticationService.refreshToken(refreshToken);
                        //location.reload();
                    } else {
                        return throwError(err);
                    }
                })
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Get JWT token from localStorage
    const token = localStorage.getItem('token');

    // If token exists, add Authorization header
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

          // Send request and handle errors
    return next.handle(req).pipe(

     /* catchError((err: HttpErrorResponse) => {

        // JWT expired / invalid / unauthorized
        if (err.status === 401) {

          console.warn('🔐 Unauthorized - logging out user...');

          // Clear authentication data
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('roles');
          localStorage.removeItem('pageSize');

          // Redirect to login
          this.router.navigate(['/login']);
        }

        // Pass error to the component/service
        return throwError(() => err);
      })*/

    );
      }
}
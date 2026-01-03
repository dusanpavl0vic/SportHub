import {
 HttpErrorResponse,
 HttpEvent,
 HttpHandler,
 HttpInterceptor,
 HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { logout } from 'src/app/auth/store/auth.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 constructor(
  private store: Store<AppState>,
  private router: Router,
 ) {}

 intercept(
  req: HttpRequest<any>,
  handler: HttpHandler,
 ): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');

  // Ako postoji token, kloniraj zahtev sa Authorization headerom
  const clonedRequest = token
   ? req.clone({
      headers: req.headers.set(
       'Authorization',
       `Bearer ${token}`,
      ),
     })
   : req;

  // Sada uvek hendluj greške
  return handler.handle(clonedRequest).pipe(
   catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
     // Token nevažeći ili istekao → očisti stanje
     localStorage.removeItem('token');
     this.store.dispatch(logout());
     this.router.navigate(['/login']);
    }

    return throwError(() => error);
   }),
  );
 }
}

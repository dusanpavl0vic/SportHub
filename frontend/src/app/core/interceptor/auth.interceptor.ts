import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, Observable, throwError } from "rxjs";
import { AppState } from "src/app/app.state";
import { logout } from "src/app/store/auth/auth.action";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return handler.handle(clonedRequest);
    }

    return handler.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Izloguj korisnika
          localStorage.removeItem('token');
          this.store.dispatch(logout());
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
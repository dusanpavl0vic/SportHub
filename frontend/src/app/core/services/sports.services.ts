import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Sport } from 'src/interfaces/sport/sport.dto';

@Injectable({ providedIn: 'root' })
export class SportService {
 private apiUrl = 'http://localhost:3000/sport';

 constructor(private http: HttpClient) { }

 getAllSports(): Observable<Sport[]> {
  return this.http.get<Sport[]>(this.apiUrl).pipe(
   catchError(error => {
    console.error('Error fetching sports', error);
    return throwError(() => error);
   })
  );
 }
}

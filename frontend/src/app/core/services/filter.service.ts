import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Sport } from 'src/interfaces/sport/sport.dto';

@Injectable({ providedIn: 'root' })
export class FilterService {
 private apiUrl = 'http://localhost:3000/';

 constructor(private http: HttpClient) {}

 getSportsCitys(): Observable<{
  Sports: Sport[];
  Citys: string[];
 }> {
  console.log('Fetching sports and cities from API');
  const sports: Observable<Sport[]> = this.http.get<
   Sport[]
  >(`${this.apiUrl}sport`);
  const cities: Observable<string[]> = this.http.get<
   string[]
  >(`${this.apiUrl}teams/cities`);

  return forkJoin({
   Sports: sports,
   Citys: cities,
  });
 }
}

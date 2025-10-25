import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/'; // prilagodi ako backend radi na drugom portu

  constructor(
    private http: HttpClient
  ) { }

  getCities(data: { country: string }): Observable<CitiesResponse> {
    return this.http.post<CitiesResponse>(`${this.apiUrl}countries/cities`, data);
  }
}


interface CitiesResponse {
  error: string,
  msg: string,
  data: string[]
}
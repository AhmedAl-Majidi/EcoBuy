import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  apiUrl = 'https://dummyjson.com/products';

  login(credentials: any) {
    return this.http.post<any>(`https://dummyjson.com/auth/login`, credentials);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const requestBody = { username, password };
    return this.http.post<any>(`${this.baseUrl}/api/Login`, requestBody);
  }

  setToken(token: string): void{
    localStorage.setItem('user-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem("user-token");
  }

  setUser(user: User):void{
    localStorage.setItem('user-data', JSON.stringify(user));
  }

  getUser():User{
    let _user!: User;

    let user = localStorage.getItem("user-data");
    if (user) {
      return JSON.parse(user);
    }

    return _user;
  }

  clearToken():void{
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-data');
    localStorage.clear();
  }
  
}


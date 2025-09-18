import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  baseURL = environment.baseURL;
  constructor(private http: HttpClient) {}

  signin(user_id: any, password: string) {
    let url = this.baseURL + 'Clients/login';
    let params = new HttpParams().set('Id', user_id).set('password', password);
    return this.http.post(url, '', { params });
  }
  login() {
    this.loggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true'); // optional
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value || localStorage.getItem('isLoggedIn') === 'true';
  }

  get authStatus$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}

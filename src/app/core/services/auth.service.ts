import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

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

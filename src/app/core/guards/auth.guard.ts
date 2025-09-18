import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _AuthService = inject(AuthService);

  const status = _AuthService.isAuthenticated();
  if (_AuthService.isAuthenticated()) {
    return true;
  } else {
    console.log('Not Authenticated');
    return false;
  }
};

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const token = loginService.getToken();

  return token ? true : false;
};

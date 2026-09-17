import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
const stored = localStorage.getItem('roles');
    const roles: string[] = stored ? JSON.parse(stored) : [];
  
    return roles.includes('ROLE_admin') || roles.includes('ROLE_seller');
  };

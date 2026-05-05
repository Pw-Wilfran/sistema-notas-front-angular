import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const allowedRoles = route.data?.['roles'];

  return user.roles?.some((r: any) =>
    allowedRoles.includes(r.name)
  );
};
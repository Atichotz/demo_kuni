import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { filter, first, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.session$.pipe(
    filter(session => session !== undefined), // รอ Supabase ตอบก่อน ไม่ตัดสินตอน loading
    first(),
    map(session => (session ? true : router.createUrlTree(['/login']))),
  );
};

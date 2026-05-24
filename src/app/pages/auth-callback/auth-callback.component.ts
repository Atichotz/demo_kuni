import { Component, OnInit, inject } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';

// Landing page หลัง Google OAuth redirect — รอ session จาก AuthService singleton
@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss',
})
export class AuthCallbackComponent implements OnInit {
  private readonly auth = inject(AuthService);

  ngOnInit(): void {
    // AuthService.initAuthListener() จะ handle redirect ให้เองเมื่อ session พร้อม
    // แต่ถ้า session มีอยู่แล้ว (refresh) ให้ redirect ทันที
    this.auth.session$.pipe(take(1)).subscribe((session) => {
      if (session) {
        // onAuthStateChange จะ navigate ให้เอง — ไม่ต้อง navigate ซ้ำ
      }
    });
  }
}

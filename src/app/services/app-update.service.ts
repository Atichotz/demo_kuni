import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { interval, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  updateAvailable = signal(false);

  private currentVersion: string | null = null;

  /** เริ่ม poll version.json ทุก intervalMs ms (default 60 วินาที) */
  startPolling(intervalMs = 60_000): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.fetchVersion().subscribe(v => {
      this.currentVersion = v;
    });

    interval(intervalMs).pipe(
      switchMap(() => this.fetchVersion())
    ).subscribe(v => {
      if (this.currentVersion && v && v !== this.currentVersion) {
        this.updateAvailable.set(true);
      }
    });
  }

  reload(): void {
    window.location.reload();
  }

  /** Returns build timestamp string, or null on error */
  private fetchVersion() {
    return this.http
      .get<{ v: string }>(`/version.json?_=${Date.now()}`)
      .pipe(
        map(r => r.v),
        catchError(() => of(null))
      );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserListItem {
  userId: string;
  role: 'ceo' | 'purchasing' | 'admin' | 'technician';
  name: string;
  username: string | null;
  loginType: 'google' | 'username';
}

export interface CreateUserPayload {
  username: string;
  password: string;
  role: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.apiUrl;

  // output: UserListItem[] — ทุก user ในระบบ (ceo only)
  getUsers(): Observable<UserListItem[]> {
    return this.http.get<UserListItem[]>(`${this.api}/users`);
  }

  // input: userId, newPassword ที่ผ่าน validation แล้ว
  resetPassword(userId: string, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/users/${userId}/password`, { newPassword });
  }

  // input: userId, name ใหม่
  updateName(userId: string, name: string): Observable<void> {
    return this.http.patch<void>(`${this.api}/users/${userId}/name`, { name });
  }

  // input: CreateUserPayload — สร้าง username user ใหม่ + insert allowed_users
  createUser(payload: CreateUserPayload): Observable<{ id: string; email: string; role: string }> {
    return this.http.post<{ id: string; email: string; role: string }>(
      `${this.api}/auth/create-user`,
      payload,
    );
  }
}

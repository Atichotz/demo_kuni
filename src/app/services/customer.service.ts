import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { StatusOption, CreateCustomerPayload } from '../dto/customer.dto';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/customers`;

  // output: รายการ status ทั้งหมดจาก DB
  getStatuses(): Observable<StatusOption[]> {
    return this.http.get<StatusOption[]>(`${this.baseUrl}/statuses`);
  }

  // input: CreateCustomerPayload (created_by แนบโดย backend จาก JWT)
  // output: { customer, contact } ที่ backend สร้างแล้ว
  create(payload: CreateCustomerPayload): Observable<unknown> {
    return this.http.post(this.baseUrl, payload);
  }
}

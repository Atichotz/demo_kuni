import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Customer {
  id: string;
  name: string;
  price: number;
  systemSize: string;
  date: string;
  statusId: number;
  tagsLocation: string[];
  tagsCustomer: string[];
  tagsSystem: string[];
  tagsTotal: string[];
}

export interface CustomerStatusUpdate {
  id: string;
  statusId: number;
}

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/customers`;

  // output: customers ทั้งหมดพร้อม tags และ statusId สำหรับ Kanban
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  // input: customer id (UUID) + statusId ใหม่ (number ของ status.id เช่น 3)
  updateCustomerStatus(update: CustomerStatusUpdate): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${update.id}/status`, {
      statusId: update.statusId,
    });
  }
}

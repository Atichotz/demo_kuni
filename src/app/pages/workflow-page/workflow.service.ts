import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface Customer {
  id: number;
  name: string;
  price: number;
  systemSize: string;
  // priority: 'low' | 'medium' | 'high';
  date: string;
  statusId: string;
  tagsLocation: ('HuaHin' | 'Bangkok' | 'Pattaya' | 'Up-Country')[];
  tagsCustomer: ('Residential' | 'Commercial' | 'Upgrade')[];
  tagsSystem: ('On-Grid' | 'Off-Grid' | 'Hybrid')[];
  tagsTotal: string[];
}

/** Payload sent to backend when a card moves to a new column */
export interface CustomerStatusUpdate {
  id: number;
  statusId: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: 1, name: 'sophie asdasdasdadasdasdas', price: 280000.21334, systemSize: '10 kW', date: '2 May 2026', statusId: 'need-analysis', tagsLocation: ['Pattaya'], tagsCustomer: ['Residential'], tagsSystem: ['On-Grid'] ,tagsTotal: []},
  { id: 2, name: 'บริษัท ABC จำกัด', price: 1450000, systemSize: '50 kW', date: '1 May 2026', statusId: 'need-analysis', tagsLocation: ['Pattaya'], tagsCustomer: ['Commercial'], tagsSystem: ['Off-Grid'] ,tagsTotal: []},
  { id: 3, name: 'นิดา วงษ์สวัสดิ์', price: 224000, systemSize: '8 kW', date: '30 Apr 2026', statusId: 'proposed', tagsLocation: ['HuaHin'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
  { id: 4, name: 'โรงงาน XYZ', price: 5600000, systemSize: '200 kW', date: '28 Apr 2026', statusId: 'proposed', tagsLocation: ['HuaHin'], tagsCustomer: ['Commercial'], tagsSystem: ['On-Grid'] ,tagsTotal: []},
  { id: 5, name: 'มานะ รักงาน', price: 168000, systemSize: '6 kW', date: '27 Apr 2026', statusId: 'on-going', tagsLocation: ['Bangkok'], tagsCustomer: ['Residential'], tagsSystem: ['On-Grid'] ,tagsTotal: []},
  { id: 6, name: 'โรงเรียนดีเด่น', price: 840000, systemSize: '30 kW', date: '25 Apr 2026', statusId: 'on-hold-review', tagsLocation: ['Bangkok'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
  { id: 7, name: 'โรงแรมสุขใจ', price: 2240000, systemSize: '80 kW', date: '24 Apr 2026', statusId: 'on-hold-review', tagsLocation: ['Up-Country'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
  { id: 8, name: 'สำนักงาน BCD', price: 1260000, systemSize: '45 kW', date: '20 Apr 2026', statusId: 'to-be-installed', tagsLocation: ['Up-Country'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
  { id: 9, name: 'วิไล สวยงาม', price: 420000, systemSize: '15 kW', date: '15 Apr 2026', statusId: 'installed', tagsLocation: ['Bangkok'], tagsCustomer: ['Residential'], tagsSystem: ['On-Grid'] ,tagsTotal: []},
  { id: 10, name: 'นิติบุคคล คอนโด X', price: 560000, systemSize: '20 kW', date: '12 Apr 2026', statusId: 'installed', tagsLocation: ['Bangkok'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
  { id: 11, name: 'ประสิทธิ์ ดี', price: 140000, systemSize: '5 kW', date: '5 Apr 2026', statusId: 'rejected', tagsLocation: ['Bangkok'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
  { id: 12, name: 'ร้านค้า EFG', price: 336000, systemSize: '12 kW', date: '2 Apr 2026', statusId: 'rejected', tagsLocation: ['Bangkok'], tagsCustomer: ['Residential'], tagsSystem: ['Hybrid'] ,tagsTotal: []},
];

@Injectable({ providedIn: 'root' })
export class WorkflowService {

  /** Simulate GET /api/customers — returns all customers with their current stage */
  getCustomers(): Observable<Customer[]> {
    return of(MOCK_CUSTOMERS.map(c => ({ ...c }))).pipe(delay(300));
  }

  /**
   * Simulate PATCH /api/customers/:id
   * Sends only the moved customer's new statusId — not the whole list
   */
  updateCustomerStatus(update: CustomerStatusUpdate): Observable<CustomerStatusUpdate> {
    return of(update).pipe(
      delay(200),
      tap(payload => console.log(`[API] PATCH /api/customers/${payload.id}`, payload)),
    );
  }
}

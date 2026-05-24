import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import type { CustomerDetail, StatusOption } from '../../dto/customer.dto';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'Primary' | 'Secondary' | 'Other';
  isEditing: boolean;
}

interface Note {
  id: number;
  text: string;
  date: Date;
  author: string;
}

@Component({
  selector: 'app-customer-detail-page',
  imports: [CommonModule, FormsModule, FloatLabelModule, InputTextModule, SelectModule, RouterLink],
  templateUrl: './customer-detail-page.component.html',
  styleUrl: './customer-detail-page.component.scss'
})
export class CustomerDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly customerService = inject(CustomerService);

  customer: CustomerDetail | null = null;
  isLoading = true;

  contacts: Contact[] = [];
  statusList: StatusOption[] = [];
  statusSelected: number | null = null;

  private nextTempId = 0;
  private nextNoteId = 1;

  notes: Note[] = [];
  showNoteForm = false;
  newNoteText = '';

  get currentStatusName(): string {
    return this.statusList.find(s => s.id === this.statusSelected)?.status_name ?? '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.customerService.getStatuses().subscribe({
      next: (statuses) => { this.statusList = statuses; },
      error: (err) => console.error('[API] Failed to load statuses:', err),
    });

    this.customerService.getOne(id).subscribe({
      next: (data) => {
        this.customer = data;
        this.statusSelected = data.statusId;
        this.contacts = data.contacts.map(c => ({
          id: c.id,
          name: `${c.firstname ?? ''} ${c.lastname ?? ''}`.trim(),
          phone: c.tel ?? '',
          email: c.email ?? '',
          type: c.isPrimary ? 'Primary' : 'Secondary',
          isEditing: false,
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[API] Failed to load customer:', err);
        this.isLoading = false;
      },
    });
  }

  addContact(): void {
    this.contacts.push({
      id: `new-${this.nextTempId++}`,
      name: '',
      phone: '',
      email: '',
      type: 'Other',
      isEditing: true,
    });
  }

  saveContact(contact: Contact): void {
    contact.isEditing = false;
  }

  removeContact(id: string): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }

  toggleNoteForm(): void {
    this.showNoteForm = !this.showNoteForm;
    if (!this.showNoteForm) {
      this.newNoteText = '';
    }
  }

  saveNote(): void {
    const trimmed = this.newNoteText.trim();
    if (!trimmed) return;

    this.notes.unshift({
      id: this.nextNoteId++,
      text: trimmed,
      date: new Date(),
      author: 'Staff_You',
    });

    this.newNoteText = '';
    this.showNoteForm = false;
  }

  removeNote(id: number): void {
    this.notes = this.notes.filter(n => n.id !== id);
  }
}

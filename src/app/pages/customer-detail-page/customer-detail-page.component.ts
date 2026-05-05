import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RouterLink } from "@angular/router";
interface Contact {
  id: number;
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
export class CustomerDetailPageComponent {
  private nextContactId = 3;
  private nextNoteId = 3;
  statusSelected = 'On-Going';
  contacts: Contact[] = [
    { id: 1, name: 'John Doe', phone: '+66 81 234 5678', email: 'john.doe@example.com', type: 'Primary', isEditing: false },
    { id: 2, name: 'Jane Doe', phone: '+66 89 876 5432', email: 'jane.doe@example.com', type: 'Secondary', isEditing: false },
  ];
  statusList = [
    { label: 'Need Analysis', value: 'need_analysis' },
    { label: 'Proposed', value: 'proposed' },
    { label: 'On-Going', value: 'on_going' },
    { label: 'On Hold / Review', value: 'on_hold' },
    { label: 'To Be Installed', value: 'to_be_installed' },
    { label: 'Installed', value: 'installed' },
    { label: 'Rejected', value: 'rejected' }
  ];
  notes: Note[] = [
    { id: 1, text: 'Customer requested to review the battery options before final sign-off.', date: new Date('2026-05-02'), author: 'Staff_Jane' },
    { id: 2, text: 'Initial consultation done.', date: new Date('2026-04-28'), author: 'Staff_Mark' },
  ];

  showNoteForm = false;
  newNoteText = '';

  addContact(): void {
    this.contacts.push({ id: this.nextContactId++, name: '', phone: '', email: '', type: 'Other', isEditing: true });
  }

  saveContact(contact: Contact): void {
    contact.isEditing = false;
  }

  removeContact(id: number): void {
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

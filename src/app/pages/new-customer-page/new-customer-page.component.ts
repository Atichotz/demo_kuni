import { Component, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-new-customer-page',
  imports: [SelectModule,FormsModule],
  templateUrl: './new-customer-page.component.html',
  styleUrls: ['./new-customer-page.component.scss']
})
export class NewCustomerPageComponent {
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  statusSelected = 'On-Going';
  statusList = [
    { label: 'Need Analysis', value: 'need_analysis' },
    { label: 'Proposed', value: 'proposed' },
    { label: 'On-Going', value: 'on_going' },
    { label: 'On Hold / Review', value: 'on_hold' },
    { label: 'To Be Installed', value: 'to_be_installed' },
    { label: 'Installed', value: 'installed' },
    { label: 'Rejected', value: 'rejected' }
  ];
  selectedType = signal<string>('personal');

  onSave(): void {
    this.saved.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}

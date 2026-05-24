import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';

@Component({
  selector: 'app-new-customer-success-popup',
  imports: [],
  templateUrl: './new-customer-success-popup.component.html',
  styleUrls: ['./new-customer-success-popup.component.scss']
})
export class NewCustomerSuccessPopupComponent implements OnInit {
  @Input({ required: true }) data!: any;
  @Output() openDetail = new EventEmitter<string>();
  userId!: string;

  openDetailPopup() {
    this.openDetail.emit(this.data.customer);
  }
  ngOnInit() {
    console.log('New customer success popup data:', this.data);
  }
}

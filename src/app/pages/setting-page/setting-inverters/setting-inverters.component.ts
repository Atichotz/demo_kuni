import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface InverterRow {
  brand: string;
  phase: string;
  kw: number | null;
  description: string;
  costPrice: number | null;
  shipping: number | null;
  salePrice: number | null;
  notes: string;
}

const BRANDS = ['Huawei', 'SMA', 'Fronius', 'GoodWe', 'Sungrow'];
const PHASES = ['Single Phase', 'Three Phase'];

@Component({
  selector: 'app-setting-inverters',
  imports: [FormsModule, SelectModule],
  templateUrl: './setting-inverters.component.html',
  styleUrl: './setting-inverters.component.scss'
})
export class SettingInvertersComponent {
  readonly brands = BRANDS;
  readonly phases = PHASES;

  rows: InverterRow[] = [
    { brand: 'Huawei', phase: 'Single Phase', kw: null, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' },
  ];

  addRow(): void {
    this.rows.push({ brand: 'Huawei', phase: 'Single Phase', kw: null, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' });
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface BatteryRow {
  brand: string;
  kw: number | null;
  description: string;
  costPrice: number | null;
  shipping: number | null;
  salePrice: number | null;
  notes: string;
}

const BRANDS = ['Dyness', 'BYD', 'CATL', 'Pylontech', 'Growatt'];

@Component({
  selector: 'app-setting-batteries',
  imports: [FormsModule, SelectModule],
  templateUrl: './setting-batteries.component.html',
  styleUrl: './setting-batteries.component.scss'
})
export class SettingBatteriesComponent {
  readonly brands = BRANDS;

  rows: BatteryRow[] = [
    { brand: 'Dyness', kw: null, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' },
  ];

  addRow(): void {
    this.rows.push({ brand: 'Dyness', kw: null, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' });
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }
}

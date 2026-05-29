import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

interface PanelRow {
  brand: string;
  kw: number | null;
  description: string;
  costPrice: number | null;
  shipping: number | null;
  salePrice: number | null;
  notes: string;
}

const BRANDS = ['Jinko', 'Canadian Solar', 'LONGi', 'Trina Solar', 'JA Solar'];

@Component({
  selector: 'app-setting-panels',
  imports: [FormsModule, SelectModule],
  templateUrl: './setting-panels.component.html',
  styleUrl: './setting-panels.component.scss'
})
export class SettingPanelsComponent {
  readonly brands = BRANDS;

  rows: PanelRow[] = [
    { brand: 'Jinko', kw: 1, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' },
    { brand: 'Jinko', kw: 2, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' },
    { brand: 'Jinko', kw: 3, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' },
  ];

  addRow(): void {
    this.rows.push({ brand: 'Jinko', kw: null, description: '', costPrice: null, shipping: null, salePrice: null, notes: '' });
  }

  removeRow(index: number): void {
    this.rows.splice(index, 1);
  }
}

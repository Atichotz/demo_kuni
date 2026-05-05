import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';

interface Battery {
  brand: string;
  model: string;
  capacityKwh: number;
  price: number;
  pricePerWh: number;
}

interface BatteryTier {
  key: string;
  title: string;
  description: string;
  colorClass: string;
  batteries: Battery[];
}

@Component({
  selector: 'app-battery-guide',
  imports: [DecimalPipe, Button],
  templateUrl: './battery-guide.component.html',
  styleUrl: './battery-guide.component.scss'
})
export class BatteryGuideComponent {
  readonly tiers: BatteryTier[] = [
    {
      key: 'A',
      title: 'A Tier',
      description: 'Good Value — ₱7-9/Wh',
      colorClass: 'tier-a',
      batteries: [
        { brand: 'LvTopSun', model: '51.2V 300Ah (15.36kWh)', capacityKwh: 15.36, price: 110000, pricePerWh: 7.2 },
        { brand: 'One Solar', model: 'LiFePO4 48V 200Ah (9.6kWh)', capacityKwh: 9.6, price: 68750, pricePerWh: 7.2 },
        { brand: 'LvTopSun', model: '51.2V 200Ah (10.24kWh)', capacityKwh: 10.24, price: 79750, pricePerWh: 7.8 },
        { brand: 'SRNE', model: 'SE10B 51.2V 205Ah (10.49kWh)', capacityKwh: 10.49, price: 88000, pricePerWh: 8.4 },
        { brand: 'SRNE', model: 'SE15B 51.2V 280Ah (14.33kWh)', capacityKwh: 14.33, price: 121000, pricePerWh: 8.4 },
        { brand: 'AllTopElec', model: 'ATE-48V-300Ah (51.2V 15.36kWh)', capacityKwh: 15.36, price: 132000, pricePerWh: 8.6 }
      ]
    },
    {
      key: 'B',
      title: 'B Tier',
      description: 'Mid-Range — ₱9-11/Wh',
      colorClass: 'tier-b',
      batteries: [
        { brand: 'AllTopElec', model: 'ATE-48V-200Ah (51.2V 10.24kWh)', capacityKwh: 10.24, price: 56250, pricePerWh: 9.4 },
        { brand: 'LvTopSun', model: '51.2V 100Ah (5.12kWh)', capacityKwh: 5.12, price: 48400, pricePerWh: 9.5 },
        { brand: 'LVFU', model: 'LFRX51200-01 (51.2V 10.24kWh)', capacityKwh: 10.24, price: 59000, pricePerWh: 9.7 },
        { brand: 'SRNE', model: 'SE05B 51.2V 100Ah (5.12kWh)', capacityKwh: 5.12, price: 49500, pricePerWh: 9.7 },
        { brand: 'HIGEE', model: '51.2V 200Ah EVE (10.2kWh)', capacityKwh: 10.2, price: 101750, pricePerWh: 10.0 },
        { brand: 'LVFU', model: 'LFRX51100-01 (51.2V 5.12kWh)', capacityKwh: 5.12, price: 55000, pricePerWh: 10.7 }
      ]
    },
    {
      key: 'C',
      title: 'C Tier',
      description: 'Premium — ₱11+/Wh',
      colorClass: 'tier-c',
      batteries: [
        { brand: 'Dyness', model: 'A48100/BX51100 51.2V (5.12kWh)', capacityKwh: 5.12, price: 58300, pricePerWh: 11.4 },
        { brand: 'Dyness', model: 'DL5.0C 51.2V 100Ah (5.12kWh)', capacityKwh: 5.12, price: 58300, pricePerWh: 11.4 },
        { brand: 'Dyness', model: 'B3 51.2V 70Ah (3.6kWh)', capacityKwh: 3.6, price: 41250, pricePerWh: 11.5 },
        { brand: 'HIGEE', model: '48V 100Ah LiFePO4 (4.8kWh)', capacityKwh: 4.8, price: 56650, pricePerWh: 11.8 },
        { brand: 'Dyness', model: 'PowerBox G2 51.2V 200Ah (10.24kWh)', capacityKwh: 10.24, price: 121000, pricePerWh: 11.8 },
        { brand: 'Pylontech', model: 'US2000C 48V 50Ah (2.4kWh)', capacityKwh: 2.4, price: 28600, pricePerWh: 11.9 },
        { brand: 'Dyness', model: 'B4850 48V 50Ah (2.4kWh)', capacityKwh: 2.4, price: 31350, pricePerWh: 13.1 },
        { brand: 'Pylontech', model: 'US3000C 48V 74Ah (3.5kWh)', capacityKwh: 3.5, price: 47300, pricePerWh: 13.5 },
        { brand: 'Pylontech', model: 'US5000C 48V 100Ah (4.8kWh)', capacityKwh: 4.8, price: 68750, pricePerWh: 14.3 },
        { brand: 'BYD', model: 'Battery-Box LV5.0+ 48V (5.0kWh)', capacityKwh: 5.0, price: 79750, pricePerWh: 15.9 }
      ]
    }
  ];
}

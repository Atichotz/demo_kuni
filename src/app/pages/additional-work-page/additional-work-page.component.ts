import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

interface SelectOption {
  label: string;
  value: string;
}

interface SystemSizeOption {
  kw: number;
  panels: string;
}

@Component({
  selector: 'app-additional-work-page',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './additional-work-page.component.html',
  styleUrl: './additional-work-page.component.scss'
})
export class AdditionalWorkPageComponent {

  readonly electricityRate = signal<number>(11);

  systemType    = signal<'hybrid' | 'grid-tied'>('hybrid');
  systemSize    = signal(5);
  solarPanel    = signal('seraphim-550w');
  inverterModel = signal('deye-5kw');
  batteryStorage      = signal('none');
  includeInstallation = signal('yes');

  readonly dcCapacity     = computed(() => this.systemSize() * 1.1);
  readonly annualProduction = computed(() => this.systemSize() * 1445.4);
  readonly monthlySavings = computed(() => (this.annualProduction() / 12) * this.electricityRate());
  readonly annualSavings  = computed(() => this.annualProduction() * this.electricityRate());
  readonly co2Offset      = computed(() => this.annualProduction() * 0.7083);

  readonly totalCost = computed(() => {
    const base     = this.systemBasePrices[this.systemSize()] ?? 248765;
    const batPrice = this.batteryOptions.find(b => b.value === this.batteryStorage())?.price ?? 0;
    const installAdj = this.includeInstallation() === 'no' ? -30000 : 0;
    return base + batPrice + installAdj;
  });

  readonly paybackPeriod = computed(() => {
    const savings = this.annualSavings();
    return savings > 0 ? this.totalCost() / savings : 0;
  });

  readonly systemSizes: SystemSizeOption[] = [
    { kw: 1,  panels: '~2 panels'  },
    { kw: 2,  panels: '~4 panels'  },
    { kw: 3,  panels: '~6 panels'  },
    { kw: 5,  panels: '~10 panels' },
    { kw: 6,  panels: '~14 panels' },
    { kw: 8,  panels: '~16 panels' },
    { kw: 10, panels: '~20 panels' },
    { kw: 12, panels: '~22 panels' },
    { kw: 16, panels: '~27 panels' }
  ];

  readonly solarPanelOptions: SelectOption[] = [
    { label: 'Seraphim 550W PERC Mono — ₱4,950.00',   value: 'seraphim-550w' },
    { label: 'Jinko 545W Tiger Neo — ₱5,200.00',      value: 'jinko-545w'    },
    { label: 'Canadian Solar 550W HiKu6 — ₱5,100.00', value: 'canadian-550w' },
    { label: 'Longi 560W Hi-MO5 — ₱5,350.00',        value: 'longi-560w'    }
  ];

  readonly inverterOptions: SelectOption[] = [
    { label: 'Deye 5kW (SUN-5K-SG03LP1-EU) — ₱60,500.00',   value: 'deye-5kw'  },
    { label: 'Solis 5kW (S6-EH1P5K-L) — ₱55,000.00',        value: 'solis-5kw' },
    { label: 'LuxPower 5kW (LXP-5K) — ₱52,000.00',          value: 'lux-5kw'   },
    { label: 'Deye 8kW (SUN-8K-SG01LP1-EU) — ₱78,000.00',   value: 'deye-8kw'  },
    { label: 'Deye 10kW (SUN-10K-SG04LP3-EU) — ₱95,000.00', value: 'deye-10kw' }
  ];

  readonly batteryOptions: (SelectOption & { price: number })[] = [
    { label: 'None — No Battery',                         value: 'none',         price: 0       },
    { label: 'Pylontech US2000C 48V 50Ah — ₱28,600.00',  value: 'pylontech-2k', price: 28600   },
    { label: 'LVFU LFRX51200-01 51.2V — ₱59,000.00',     value: 'lvfu-12k',     price: 59000   },
    { label: 'LvTopSun 51.2V 300Ah — ₱110,000.00',       value: 'lvtopsun-15k', price: 110000  }
  ];

  readonly installationOptions: SelectOption[] = [
    { label: 'Yes — With Full Installation', value: 'yes' },
    { label: 'No — Supply Only',             value: 'no'  }
  ];

  private readonly systemBasePrices: Record<number, number> = {
    1:  68000,
    2:  118000,
    3:  165000,
    5:  248765,
    6:  288000,
    8:  368000,
    10: 445000,
    12: 520000,
    16: 675000
  };
}

import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Button } from 'primeng/button';

interface Opt { label: string; value: string; }

@Component({
  selector: 'app-calculators-page',
  imports: [FormsModule, DecimalPipe, Button],
  templateUrl: './calculators-page.component.html',
  styleUrl: './calculators-page.component.scss'
})
export class CalculatorsPageComponent {

  // ── Shared option lists
  readonly dcVoltages: Opt[] = [
    { label: '12V', value: '12' },
    { label: '24V', value: '24' },
    { label: '48V', value: '48' }
  ];

  readonly acVoltages: Opt[] = [
    { label: '110V', value: '110' },
    { label: '220V', value: '220' },
    { label: '230V', value: '230' },
    { label: '240V', value: '240' },
    { label: '380V', value: '380' },
    { label: '400V', value: '400' },
    { label: '415V', value: '415' }
  ];

  readonly dropVoltages: Opt[] = [
    { label: '12V',  value: '12'  },
    { label: '24V',  value: '24'  },
    { label: '48V',  value: '48'  },
    { label: '110V', value: '110' },
    { label: '220V', value: '220' },
    { label: '230V', value: '230' },
    { label: '400V', value: '400' }
  ];

  readonly cableSizes: Opt[] = [
    { label: '1.5 mm²', value: '1.5' }, { label: '2.5 mm²', value: '2.5' },
    { label: '4 mm²',   value: '4'   }, { label: '6 mm²',   value: '6'   },
    { label: '10 mm²',  value: '10'  }, { label: '16 mm²',  value: '16'  },
    { label: '25 mm²',  value: '25'  }, { label: '35 mm²',  value: '35'  },
    { label: '50 mm²',  value: '50'  }
  ];

  readonly sunshineOpts: (Opt & { psh: number })[] = [
    { label: 'Excellent (6 hrs/day)', value: 'excellent', psh: 6 },
    { label: 'Good (5 hrs/day)',      value: 'good',      psh: 5 },
    { label: 'Average (4 hrs/day)',   value: 'average',   psh: 4 },
    { label: 'Poor (3 hrs/day)',      value: 'poor',      psh: 3 }
  ];

  readonly circuitTypes: Opt[] = [
    { label: 'DC Circuit',      value: 'dc'     },
    { label: 'AC Single Phase', value: 'ac-1ph' },
    { label: 'AC Three Phase',  value: 'ac-3ph' }
  ];

  readonly conductorSizes: Opt[] = [
    { label: '1.5 mm²', value: '1.5'  }, { label: '2.5 mm²', value: '2.5'  },
    { label: '4 mm²',   value: '4'    }, { label: '6 mm²',   value: '6'    },
    { label: '10 mm²',  value: '10'   }, { label: '16 mm²',  value: '16'   },
    { label: '25 mm²',  value: '25'   }, { label: '35 mm²',  value: '35'   },
    { label: '50 mm²',  value: '50'   }, { label: '70 mm²',  value: '70'   },
    { label: '95 mm²',  value: '95'   }, { label: '120 mm²', value: '120'  }
  ];

  private readonly breakerSizes = [10, 15, 16, 20, 25, 30, 32, 40, 50, 63, 80, 100, 125];
  private readonly wireSizeTable = [
    { size: 2.5, rating: 26 }, { size: 4,  rating: 34 }, { size: 6,  rating: 43  },
    { size: 10,  rating: 60 }, { size: 16, rating: 80 }, { size: 25, rating: 101 },
    { size: 35,  rating: 122}, { size: 50, rating: 146 }
  ];
  private readonly pshMap: Record<string, number> = { excellent: 6, good: 5, average: 4, poor: 3 };

  private nextBreaker(design: number): number {
    return this.breakerSizes.find(s => s >= design) ?? 125;
  }

  // ═══ 1. Power Duration ═══
  c1Voltage = signal('24');
  c1BattCap = signal<number | null>(null);
  c1Load    = signal<number | null>(null);
  readonly c1Result = computed(() => {
    const v = Number(this.c1Voltage());
    const ah = this.c1BattCap();
    const w  = this.c1Load();
    if (!ah || !w || w === 0) return null;
    return (v * ah * 0.8) / w;
  });

  // ═══ 2. Battery Required ═══
  c2Voltage = signal('24');
  c2Load    = signal<number | null>(null);
  c2Hours   = signal<number | null>(null);
  readonly c2Result = computed(() => {
    const v = Number(this.c2Voltage());
    const w = this.c2Load();
    const h = this.c2Hours();
    if (!v || !w || !h) return null;
    return (w * h) / (v * 0.8);
  });

  // ═══ 3. Solar Panels Required ═══
  c3Voltage  = signal('24');
  c3Sunshine = signal('good');
  c3BattCap  = signal<number | null>(null);
  readonly c3Result = computed(() => {
    const v   = Number(this.c3Voltage());
    const ah  = this.c3BattCap();
    const psh = this.pshMap[this.c3Sunshine()] ?? 5;
    if (!ah) return null;
    const energyWh = (v * ah) / 0.85;
    return Math.ceil(energyWh / (550 * psh * 0.85));
  });

  // ═══ 4. Battery Charge Time ═══
  c4BattCap       = signal<number | null>(null);
  c4ChargeCurrent = signal<number | null>(null);
  c4Soc           = signal<number | null>(50);
  readonly c4Result = computed(() => {
    const ah  = this.c4BattCap();
    const i   = this.c4ChargeCurrent();
    const soc = this.c4Soc();
    if (!ah || !i || i === 0 || soc === null) return null;
    return (ah * (1 - soc / 100)) / i;
  });

  // ═══ 5. Breaker Sizing ═══
  c5Phase   = signal('single');
  c5Voltage = signal('230');
  c5Load    = signal<number | null>(null);
  readonly c5Result = computed(() => {
    const v = Number(this.c5Voltage());
    const w = this.c5Load();
    if (!v || !w) return null;
    const i  = this.c5Phase() === 'three' ? w / (v * Math.sqrt(3)) : w / v;
    const id = i * 1.25;
    return { current: i, design: id, size: this.nextBreaker(id) };
  });

  // ═══ 6. String Sizing ═══
  c6PanelVoc  = signal<number | null>(null);
  c6PanelVmp  = signal<number | null>(null);
  c6TempCoeff = signal<number | null>(-0.29);
  c6InvMaxV   = signal<number | null>(null);
  c6InvMinV   = signal<number | null>(null);
  c6MinTemp   = signal<number | null>(null);
  c6MaxTemp   = signal<number | null>(null);
  readonly c6Result = computed(() => {
    const voc   = this.c6PanelVoc();
    const vmp   = this.c6PanelVmp();
    const coeff = this.c6TempCoeff();
    const iMax  = this.c6InvMaxV();
    const iMin  = this.c6InvMinV();
    const tMin  = this.c6MinTemp();
    const tMax  = this.c6MaxTemp();
    if (!voc || !vmp || coeff === null || !iMax || !iMin || tMin === null || tMax === null) return null;
    const vocCold = voc * (1 + (coeff / 100) * (tMin - 25));
    const vmpHot  = vmp * (1 + (coeff / 100) * (tMax - 25));
    const maxS    = Math.floor(iMax / vocCold);
    const minS    = Math.ceil(iMin / vmpHot);
    return { minS: Math.max(1, minS), maxS, vocCold, vmpHot, valid: maxS >= Math.max(1, minS) };
  });

  // ═══ 7. Voltage Drop Check ═══
  c7Circuit      = signal('dc');
  c7Voltage      = signal('48');
  c7Current      = signal<number | null>(null);
  c7Length       = signal<number | null>(null);
  c7CrossSection = signal('6');
  readonly c7Result = computed(() => {
    const v = Number(this.c7Voltage());
    const i = this.c7Current();
    const l = this.c7Length();
    const a = Number(this.c7CrossSection());
    if (!v || !i || !l || !a) return null;
    const rho   = 0.0175; // copper Ω·mm²/m
    const vDrop = this.c7Circuit() === 'ac-3ph'
      ? (Math.sqrt(3) * l * i * rho) / a
      : (2 * l * i * rho) / a;
    const pct = (vDrop / v) * 100;
    return { vDrop, pct, ok: pct <= 3 };
  });

  // ═══ 8. PV String Wire Sizing ═══
  c8Isc     = signal<number | null>(null);
  c8Strings = signal<number | null>(null);
  readonly c8Result = computed(() => {
    const isc     = this.c8Isc();
    const strings = this.c8Strings();
    if (!isc || !strings) return null;
    const maxI = isc * strings * 1.25;
    const wire = this.wireSizeTable.find(w => w.rating >= maxI);
    return { maxI, size: wire?.size ?? null, rating: wire?.rating ?? null };
  });

  // ═══ 9. Inverter Output Breaker ═══
  c9Phase   = signal('single');
  c9Output  = signal<number | null>(null);
  c9Voltage = signal('230');
  readonly c9Result = computed(() => {
    const va = this.c9Output();
    const v  = Number(this.c9Voltage());
    if (!va || !v) return null;
    const i  = this.c9Phase() === 'three' ? va / (v * Math.sqrt(3)) : va / v;
    const id = i * 1.25;
    return { current: i, design: id, size: this.nextBreaker(id) };
  });

  // ═══ 10. Earthing Conductor Sizing ═══
  c10Material   = signal('copper');
  c10ActiveSize = signal('16');
  readonly c10Result = computed(() => {
    const size = Number(this.c10ActiveSize());
    if (!size) return null;
    if (this.c10Material() === 'copper') {
      if (size <= 16) return size;
      if (size <= 35) return 16;
      return Math.ceil(size / 2);
    } else {
      if (size <= 25) return 16;
      return Math.ceil(size / 2);
    }
  });
}

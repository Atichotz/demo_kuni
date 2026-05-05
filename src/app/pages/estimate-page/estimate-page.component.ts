import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';
interface SelectOption {
  label: string;
  value: string;
}

interface EnergyPattern {
  value: string;
  icon: string;
  label: string;
  desc: string;
}

@Component({
  selector: 'app-estimate-page',
  imports: [FormsModule, SelectModule, RouterLink, ButtonModule],
  templateUrl: './estimate-page.component.html',
  styleUrl: './estimate-page.component.scss'
})
export class EstimatePageComponent implements OnInit {
  ngOnInit(): void {
  }

  readonly energyPatterns: EnergyPattern[] = [
    { value: 'daytime', icon: '☀️', label: 'Mostly Daytime', desc: '80% day / 20% night' },
    { value: 'balanced', icon: '⚡🌙', label: 'Balanced', desc: '60% day / 40% night' },
    { value: 'nighttime', icon: '🌙', label: 'Mostly Nighttime', desc: '40% day / 60% night' },
    { value: 'heavy-night', icon: '🌙🌙', label: 'Heavy Nighttime', desc: '20% day / 80% night' }
  ];

  selectedSolarPanel = 'seraphim-550w';
  readonly solarPanelOptions: SelectOption[] = [
    { label: 'Seraphim 550W PERC Mono', value: 'seraphim-550w' },
    { label: 'Jinko 545W Tiger Neo', value: 'jinko-545w' },
    { label: 'Canadian Solar 550W HiKu6', value: 'canadian-550w' },
    { label: 'Longi 560W Hi-MO5', value: 'longi-560w' }
  ];
  selectedInverter = 'deye-5kw';
  readonly inverterOptions: SelectOption[] = [
    { label: 'Deye 5kW (SUN-5K-SG03LP1-EU)', value: 'deye-5kw' },
    { label: 'Solis 5kW (S6-EH1P5K-L)', value: 'solis-5kw' },
    { label: 'LuxPower 5kW (LXP-5K)', value: 'lux-5kw' },
    { label: 'Deye 8kW (SUN-8K-SG01LP1-EU)', value: 'deye-8kw' },
    { label: 'Deye 10kW (SUN-10K-SG04LP3-EU)', value: 'deye-10kw' }
  ];
  selectedElectricityUsageType: any = 'none1';
  readonly electricityOptions: SelectOption[] = [
    { label: 'Residential (TOU)', value: 'none1' },
    { label: 'Residential (Standard)', value: 'non2' },
    { label: 'Commercial/Business', value: 'none3' },
  ];
  selectedBattery: any = 'none1';
  readonly batteryOptions: SelectOption[] = [
    { label: 'Battery Type/Model', value: 'none1' },
    { label: 'Huawei Luna2000 10kWh', value: 'none2' },
    { label: 'Huawei Luna2000 15kWh', value: 'none3' },
    { label: 'AlphaESS 10kWh', value: 'none4' },
  ];

  other: any = 'none1';
  readonly otherOptions: SelectOption[] = [
    { label: 'None', value: 'none1' },
    { label: 'Optimizers', value: 'none2' },
    { label: 'Smart Meter', value: 'none3' },
    { label: 'EV Charger Integration', value: 'none4' },
  ];
}

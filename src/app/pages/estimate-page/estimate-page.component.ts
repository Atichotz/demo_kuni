import { Component, computed, OnInit, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';
import { ScrollSpy } from '../../scroll-spy.util';
import { NgClass } from '@angular/common';
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
  imports: [FormsModule, SelectModule, RouterLink, ButtonModule, NgClass],
  templateUrl: './estimate-page.component.html',
  styleUrl: './estimate-page.component.scss'
})
export class EstimatePageComponent implements OnInit, AfterViewInit, OnDestroy {
  ngOnInit() { }

  activeSection = 'sec-1';
  navOpen = true;
  mobileNavOpen = false;

  private readonly scrollSpy = new ScrollSpy(
    ['sec-1', 'sec-2', 'sec-3', 'sec-4', 'sec-5', 'sec-6', 'sec-7', 'sec-8', 'sec-9', 'sec-10', 'sec-11', 'sec-12', 'sec-13'],
    (id) => (this.activeSection = id)
  );

  ngAfterViewInit() {
    this.scrollSpy.start();
  }

  ngOnDestroy() {
    this.scrollSpy.stop();
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  readonly panelTypeOptions: SelectOption[] = [
    { label: 'PERC Mono', value: 'perc-mono' },
    { label: 'TOPCon', value: 'topcon' },
    { label: 'HJT', value: 'hjt' },
    { label: 'Bifacial', value: 'bifacial' },
  ];
  selectedPanelType: string | null = null;

  readonly phaseOptions: SelectOption[] = [
    { label: '1 Phase (Single)', value: '1phase' },
    { label: '3 Phase (Three)', value: '3phase' },
  ];
  selectedPhase: string | null = null;

  readonly inverterKwOptions: SelectOption[] = [
    { label: '3 kW', value: '3kw' },
    { label: '5 kW', value: '5kw' },
    { label: '6 kW', value: '6kw' },
    { label: '8 kW', value: '8kw' },
    { label: '10 kW', value: '10kw' },
    { label: '15 kW', value: '15kw' },
    { label: '20 kW', value: '20kw' },
  ];
  selectedInverterKw: string | null = null;

  readonly batteryKwOptions: SelectOption[] = [
    { label: '5 kWh', value: '5kwh' },
    { label: '10 kWh', value: '10kwh' },
    { label: '15 kWh', value: '15kwh' },
    { label: '20 kWh', value: '20kwh' },
  ];
  selectedBatteryKw: string | null = null;

  readonly panelAccessoriesOptions: SelectOption[] = [
    { label: 'Mounting Rail', value: 'mounting-rail' },
    { label: 'MC4 Connector', value: 'mc4' },
    { label: 'Solar Cable', value: 'solar-cable' },
    { label: 'Grounding Kit', value: 'grounding' },
  ];
  selectedPanelAccessory: string | null = null;

  readonly inverterAccessoriesOptions: SelectOption[] = [
    { label: 'AC Breaker', value: 'ac-breaker' },
    { label: 'DC Combiner Box', value: 'dc-combiner' },
    { label: 'Energy Meter', value: 'energy-meter' },
    { label: 'CT Clamp', value: 'ct-clamp' },
  ];
  selectedInverterAccessory: string | null = null;

  readonly batteryAccessoriesOptions: SelectOption[] = [
    { label: 'Battery BMS Module', value: 'bms' },
    { label: 'Battery Rack', value: 'rack' },
    { label: 'Battery Cable Set', value: 'cable-set' },
  ];
  selectedBatteryAccessory: string | null = null;

  readonly rackingOptions: SelectOption[] = [
    { label: 'Ballast Racking (Flat Roof)', value: 'ballast-flat' },
    { label: 'Penetration Mount (Pitched Roof)', value: 'penetration-pitched' },
    { label: 'Ground Mount (Steel)', value: 'ground-steel' },
    { label: 'Carport Structure', value: 'carport' },
  ];
  selectedRacking: string | null = null;

  readonly bosOptions: SelectOption[] = [
    { label: 'DC Cabling Set', value: 'dc-cabling' },
    { label: 'AC Cabling Set', value: 'ac-cabling' },
    { label: 'Conduit & Trunking', value: 'conduit' },
    { label: 'Junction Box Set', value: 'junction-box' },
    { label: 'Surge Protection Device', value: 'spd' },
  ];
  selectedBOS: string | null = null;

  readonly installationTypeOptions: SelectOption[] = [
    { label: 'Standard Rooftop Install', value: 'rooftop-standard' },
    { label: 'Ground Mount Install', value: 'ground-install' },
    { label: 'High-Rise / Crane Required', value: 'high-rise' },
    { label: 'Flat Roof (Ballast)', value: 'flat-ballast' },
  ];
  selectedInstallationType: string | null = null;
}

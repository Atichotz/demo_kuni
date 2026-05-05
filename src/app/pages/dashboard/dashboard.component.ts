import { Component, signal } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TodoItem {
  id: number;
  title: string;
  details?: string;
  meta: string;
  done: boolean;
}

interface QuoteRecord {
  id: string;
  clientName: string;
  address: string;
  systemSize: number;
  systemType: 'hybrid' | 'grid-tied';
  totalCost: number;
  monthlySavings: number;
  status: 'pending' | 'approved' | 'installed';
  date: Date;
  solarPanel: string;
  inverter: string;
  battery: string | null;
}

interface KpiCard {
  label: string;
  value: string;
  sub: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendText: string;
}

interface SizeBar {
  kw: number;
  count: number;
  pct: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [DecimalPipe, DatePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  todos = signal<TodoItem[]>([
    {
      id: 1,
      title: 'Finalize quote for ABC Corp',
      details: 'Ensure the new battery pricing is included before sending. They requested the 15kWh option instead of the 10kWh.',
      meta: 'Due Today • Assigned to Jane',
      done: false
    },
    {
      id: 2,
      title: 'Follow up on inverter stock',
      details: 'Check with the supplier about the backordered Huawei SUN2000-10KTL units. We need 3 by next week.',
      meta: 'Due Tomorrow • Assigned to Mark',
      done: false
    },
    {
      id: 3,
      title: 'Send introductory email to John Doe',
      meta: 'Completed May 2',
      done: true
    }
  ]);

  toggleTask(id: number): void {
    this.todos.update(list =>
      list.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }

  addTask(input: HTMLInputElement): void {
    const title = input.value.trim();
    if (!title) return;
    this.todos.update(list => [
      ...list,
      { id: Date.now(), title, meta: 'Just added', done: false }
    ]);
    input.value = '';
  }

  deleteTask(id: number): void {
    this.todos.update(list => list.filter(t => t.id !== id));
  }

  readonly recentQuotes: QuoteRecord[] = [
    {
      id: 'Q-2025-041',
      clientName: 'Maria Santos',
      address: 'Brgy. Poblacion, Quezon City',
      systemSize: 5,
      systemType: 'hybrid',
      totalCost: 277365,
      monthlySavings: 6632,
      status: 'installed',
      date: new Date('2025-04-20'),
      solarPanel: 'Seraphim 550W',
      inverter: 'Deye 5kW',
      battery: 'Pylontech US2000C'
    },
    {
      id: 'Q-2025-040',
      clientName: 'Roberto Lim',
      address: 'Brgy. San Antonio, Makati',
      systemSize: 10,
      systemType: 'grid-tied',
      totalCost: 445000,
      monthlySavings: 13288,
      status: 'approved',
      date: new Date('2025-04-18'),
      solarPanel: 'Jinko 545W Tiger Neo',
      inverter: 'Deye 10kW',
      battery: null
    },
    {
      id: 'Q-2025-039',
      clientName: 'Ana Reyes',
      address: 'Brgy. Malabanias, Angeles, Pampanga',
      systemSize: 8,
      systemType: 'hybrid',
      totalCost: 427000,
      monthlySavings: 10623,
      status: 'approved',
      date: new Date('2025-04-15'),
      solarPanel: 'Canadian Solar 550W HiKu6',
      inverter: 'Deye 8kW',
      battery: 'LVFU LFRX51200-01'
    },
    {
      id: 'Q-2025-038',
      clientName: 'Jose Dela Cruz',
      address: 'Brgy. Sto. Niño, Pasig City',
      systemSize: 3,
      systemType: 'grid-tied',
      totalCost: 135000,
      monthlySavings: 3979,
      status: 'pending',
      date: new Date('2025-04-14'),
      solarPanel: 'Seraphim 550W',
      inverter: 'Solis 5kW',
      battery: null
    },
    {
      id: 'Q-2025-037',
      clientName: 'Carla Mendoza',
      address: 'Brgy. San Isidro, Cainta, Rizal',
      systemSize: 6,
      systemType: 'hybrid',
      totalCost: 347000,
      monthlySavings: 7963,
      status: 'installed',
      date: new Date('2025-04-10'),
      solarPanel: 'Longi 560W Hi-MO5',
      inverter: 'LuxPower 5kW',
      battery: 'LVFU LFRX51200-01'
    },
    {
      id: 'Q-2025-036',
      clientName: 'Eduardo Torres',
      address: 'Brgy. Poblacion, Dasmariñas, Cavite',
      systemSize: 12,
      systemType: 'hybrid',
      totalCost: 630000,
      monthlySavings: 15935,
      status: 'pending',
      date: new Date('2025-04-08'),
      solarPanel: 'Canadian Solar 550W HiKu6',
      inverter: 'Deye 10kW',
      battery: 'LvTopSun 51.2V 300Ah'
    }
  ];

  readonly kpiCards: KpiCard[] = [
    {
      label: 'Total Quotes (April)',
      value: '12',
      sub: 'quotes this month',
      icon: '📋',
      trend: 'up',
      trendText: '+4 vs March'
    },
    {
      label: 'Total Est. Revenue',
      value: '₱3.26M',
      sub: 'from 12 quotes',
      icon: '💰',
      trend: 'up',
      trendText: '+₱820K vs March'
    },
    {
      label: 'Avg System Size',
      value: '6.8 kW',
      sub: 'per installation',
      icon: '⚡',
      trend: 'up',
      trendText: '+1.2 kW vs March'
    },
    {
      label: 'CO₂ Offset / Yr',
      value: '18,450 kg',
      sub: 'total impact potential',
      icon: '🌱',
      trend: 'up',
      trendText: 'Equivalent to 738 trees'
    }
  ];

  readonly monthlyData = [
    { month: 'Nov', quotes: 5,  revenue: 1.1 },
    { month: 'Dec', quotes: 7,  revenue: 1.6 },
    { month: 'Jan', quotes: 6,  revenue: 1.4 },
    { month: 'Feb', quotes: 9,  revenue: 2.1 },
    { month: 'Mar', quotes: 8,  revenue: 2.4 },
    { month: 'Apr', quotes: 13, revenue: 5 }
  ];

  readonly maxQuotes = Math.max(...this.monthlyData.map(m => m.quotes));

  readonly sizeBars: SizeBar[] = [
    { kw: 5,  count: 4, pct: 100 },
    { kw: 8,  count: 3, pct: 75  },
    { kw: 10, count: 2, pct: 50  },
    { kw: 6,  count: 2, pct: 50  },
    { kw: 12, count: 1, pct: 25  }
  ];

  readonly hybridCount = this.recentQuotes.filter(q => q.systemType === 'hybrid').length;
  readonly gridTiedCount = this.recentQuotes.filter(q => q.systemType === 'grid-tied').length;
  readonly hybridPct = Math.round((this.hybridCount / this.recentQuotes.length) * 100);

  readonly installedCount = this.recentQuotes.filter(q => q.status === 'installed').length;
  readonly approvedCount  = this.recentQuotes.filter(q => q.status === 'approved').length;
  readonly pendingCount   = this.recentQuotes.filter(q => q.status === 'pending').length;

  barHeight(count: number): number {
    return Math.round((count / this.maxQuotes) * 100);
  }

  statusClass(status: QuoteRecord['status']): string {
    return {
      installed: 'badge-installed',
      approved:  'badge-approved',
      pending:   'badge-pending'
    }[status];
  }

  statusLabel(status: QuoteRecord['status']): string {
    return { installed: '✅ Installed', approved: '🟡 Approved', pending: '⏳ Pending' }[status];
  }
}

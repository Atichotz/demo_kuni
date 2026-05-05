import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from 'primeng/button';

interface NavItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  readonly mainNavItems: NavItem[] = [
    { icon: 'pi-table', label: 'Estimate', route: '/estimate' },
    { icon: 'pi-id-card', label: 'Workflow', route: '/workflow' },
    // { icon: 'pi-shopping-cart', label: 'Shop', route: '/shop' },
    // { icon: 'pi-map-marker', label: 'Find Installer', route: '/find-installer' },
    // { icon: 'pi-wrench', label: 'For Installers', route: '/for-installers' },
    { icon: 'pi-calculator', label: 'Calculators', route: '/calculators' },
    { icon: 'pi-bolt', label: 'Battery Guide', route: '/battery-guide' },
    // { icon: 'pi-book', label: 'Learn', route: '/learn' }
  ];
}

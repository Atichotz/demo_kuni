import { Component, signal } from '@angular/core';
import { SettingAccountComponent } from './setting-account/setting-account.component';
import { SettingProductsComponent } from './setting-products/setting-products.component';

type SettingSection = 'account' | 'products';

@Component({
  selector: 'app-setting-page',
  imports: [SettingAccountComponent, SettingProductsComponent],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.scss'
})
export class SettingPageComponent {
  activeSection = signal<SettingSection>('account');
}

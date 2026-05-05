import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HeaderBrandComponent } from '../header-brand/header-brand.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-staff-main-layout',
  imports: [HeaderBrandComponent,RouterOutlet],
  templateUrl: './staff-main-layout.component.html',
  styleUrl: './staff-main-layout.component.scss'
})
export class StaffMainLayoutComponent {

}
  
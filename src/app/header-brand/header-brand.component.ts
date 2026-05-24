import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { Tooltip } from "primeng/tooltip";

@Component({
  selector: 'app-header-brand',
  imports: [RouterLink, Tooltip],
  templateUrl: './header-brand.component.html',
  styleUrl: './header-brand.component.scss'
})
export class HeaderBrandComponent {
  private readonly authService = inject(AuthService);

  isLoggingOut = false;

  async logout(): Promise<void> {
    if (this.isLoggingOut) return;
    this.isLoggingOut = true;
    await this.authService.logout();
    this.isLoggingOut = false;
  }
}

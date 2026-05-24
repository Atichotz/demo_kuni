import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  username = '';
  password = '';
  showPassword = false;
  isLoading = false;
  isGoogleLoading = false;
  errorMessage = '';
  googleError = '';

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin(): Promise<void> {
    this.errorMessage = '';
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter your Username and Password';
      return;
    }
    this.isLoading = true;
    try {
      await this.auth.loginWithUsername(this.username, this.password);
      this.router.navigate(['/dashboard']);
    } catch (err: unknown) {
      this.errorMessage =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async onGoogleLogin(): Promise<void> {
    this.googleError = '';
    this.isGoogleLoading = true;
    try {
      await this.auth.loginWithGoogle();
    } catch (err: unknown) {
      this.googleError =
        err instanceof Error ? err.message : 'Google login failed';
      this.isGoogleLoading = false;
    }
  }
}

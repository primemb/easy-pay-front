import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth.component.html',
  standalone: true,
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loading = false;
  error: string | null = null;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.error = null;
    this.loading = true;
    const { username, password } = form.value;

    this.authService.login(username, password).subscribe({
      next: (value) => {
        console.log({ value });
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.log({ error });
        this.error = error.message;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}

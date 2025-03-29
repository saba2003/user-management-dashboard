import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  /** The login form instance, containing email and password fields. */
  loginForm!: FormGroup;

  /** Injectable FormBuilder instance used to create and manage the form. */
  private formbuilder = inject(FormBuilder);

  /** Injectable AuthService instance used for authentication operations. */
  private authService = inject(AuthService);

  /** Writable signal for displaying a success message upon successful login. */
  successMessage: WritableSignal<string> = signal('');

  /** Writable signal for displaying an error message if login fails. */
  errorMessage: WritableSignal<string> = signal('');

  /**
   * Initializes the component by setting up the login form with email and password fields.
   */
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Navigates to the user registration page.
   */
  gotoregister(): void {
    this.authService.navigateTo("register");
  }

  /**
   * Handles the form submission, attempts login, and updates success or error messages accordingly.
   */
  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: async () => {
        this.successMessage.set(`Logged in successfully!`);
        this.loginForm.reset();
        this.authService.navigateTo("dashboard");
      },
      error: (err) => this.errorMessage.set(err.message) 
    });
  }
}

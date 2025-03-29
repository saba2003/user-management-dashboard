import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../models/IUser.model';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabel
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  /** The registration form instance, containing fields for username, email, password, and password confirmation. */
  registerForm!: FormGroup;

  /** Injectable FormBuilder instance used to create and manage the registration form. */
  private formbuilder = inject(FormBuilder);

  /** Injectable AuthService instance used for user authentication and registration. */
  private authService = inject(AuthService);

  /** Writable signal for displaying a success message upon successful registration. */
  successMessage: WritableSignal<string> = signal('');

  /** Writable signal for displaying an error message if registration fails. */
  errorMessage: WritableSignal<string> = signal('');

  /**
   * Initializes the component by setting up the registration form with validation rules.
   */
  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator });
  }

  /**
   * Custom validator to ensure that the password and password confirmation fields match.
   * @param {FormGroup} formGroup - The form group containing password fields.
   * @returns {null | { mismatch: boolean }} Returns `null` if passwords match, otherwise an error object.
   */
  private passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  }

  /**
   * Navigates to the login page.
   */
  gotologin(): void {
    this.authService.navigateTo("login");
  }

  /**
   * Handles the form submission, attempts user registration, and updates success or error messages accordingly.
   */
  onSubmit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    const { username, email, password } = this.registerForm.value;

    this.authService.getUserCount().subscribe(count => {
      const newUser: User = { 
        id: (count + 1).toString(),
        username, 
        email, 
        password, 
        role: 'user' 
      };

      this.authService.registerUser(newUser).subscribe({
        next: async () => {
          this.successMessage.set(`User registered successfully!`);
          this.registerForm.reset();
          await this.delay(2000);
          this.gotologin();
        },
        error: (err) => this.errorMessage.set(err.message) 
      });
    });
  }

  /**
   * Creates a delay for a given time.
   * @param {number} ms - The delay duration in milliseconds.
   * @returns {Promise<void>} A promise that resolves after the given time.
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

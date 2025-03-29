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
  loginForm!: FormGroup;
  private formbuilder = inject(FormBuilder)
  private authService = inject(AuthService)

  successMessage: WritableSignal<string> = signal('');
  errorMessage: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  gotoregister(){
    this.authService.navigateTo("register")
  }

  onSubmit(){
    this.errorMessage.set('')
    this.successMessage.set('')

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: async () => {
        this.successMessage.set(`Logged in successfully!`);
        this.loginForm.reset();
        this.authService.navigateTo("dashboard")
      },
      error: (err) => this.errorMessage.set(err.message) 
    });

  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../services/auth.service';
import { User } from '../../../models/IUser.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private formbuilder = inject(FormBuilder)
  private userService = inject(UserService)
  private router = inject(Router)

  successMessage: WritableSignal<string> = signal('');
  errorMessage: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator })
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  }

  gotologin(){
    this.router.navigateByUrl('login')
  }

  onSubmit(){
    this.errorMessage.set('')
    this.successMessage.set('')
    if (this.registerForm.invalid) {
      this.errorMessage.set('Please fill all fields correctly.');
      return;
    }

    const { username, email, password } = this.registerForm.value;
    const newUser: User = { id : 0, username, email, password, role: 'user' };

    function delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    this.userService.registerUser(newUser).subscribe({
      next: async () => {
        this.successMessage.set(`User registered successfully!`);
        this.registerForm.reset();
        await delay(3000);
        this.gotologin()
      },
      error: (err) => this.errorMessage.set(err.message) 
    });

  }
  
}

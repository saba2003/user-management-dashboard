import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../auth/services/auth.service'; 
import { IUser, User } from '../../../models/IUser.model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    FormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
  ],
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent {
  editForm!: FormGroup;
  private formbuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user!: IUser;
  successMessage: WritableSignal<string> = signal('');
  errorMessage: WritableSignal<string> = signal('');

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.fetchUserById(userId).subscribe(user => {
        this.user = user;
        this.initForm();
      });
    }
  }

  private initForm() {
    this.editForm = this.formbuilder.group({
      username: [this.user.username, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  }

  onSubmit() {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.editForm.invalid) {
      this.errorMessage.set("Form is invalid");
      return;
    }

    const updatedUser: IUser = {
      ...this.user,
      username: this.editForm.value.username,
      password: this.editForm.value.password
    };

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.successMessage.set("User updated successfully!");
        this.router.navigateByUrl(`dashboard/users/${updatedUser.id}`);
      },
      error: (err) => this.errorMessage.set(err.message),
    });
  }
}

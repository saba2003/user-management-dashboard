import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IUser, User } from '../../../models/IUser.model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Component for editing user details.
 * Allows an admin or the user themselves to update their username and password.
 */
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
  /** Form for editing user details */
  editForm!: FormGroup;

  /** Injected services */
  private formbuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  /** The user being edited */
  user!: IUser;

  /** Signals for success and error messages */
  successMessage: WritableSignal<string> = signal('');
  errorMessage: WritableSignal<string> = signal('');

  /**
   * Lifecycle hook: Initializes the component, fetching user details based on route parameter.
   */
  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.fetchUserById(userId).subscribe(user => {
        this.user = user;
        this.initForm();
      });
    }
  }

  /**
   * Initializes the form with the user's current details.
   */
  private initForm(): void {
    this.editForm = this.formbuilder.group({
      username: [this.user.username, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator });
  }

  /**
   * Custom validator to ensure password and confirm password match.
   * @param {FormGroup} formGroup - The form group containing password fields.
   * @returns {null | { mismatch: boolean }} Validation result (null if valid).
   */
  private passwordMatchValidator(formGroup: FormGroup): null | { mismatch: boolean } {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { mismatch: true };
  }

  /**
   * Handles form submission, updating the user details.
   * Displays success or error messages accordingly.
   */
  onSubmit(): void {
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

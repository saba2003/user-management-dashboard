import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

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
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private formbuilder = inject(FormBuilder)

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.controls['username'].value)
    }
  }
  
}

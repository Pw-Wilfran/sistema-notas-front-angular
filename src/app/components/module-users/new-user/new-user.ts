import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/User.Service';

@Component({
  selector: 'app-new-user',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './new-user.html',
  styleUrl: './new-user.scss',
})
export class NewUser {

  form: FormGroup;
  loading = false;
  error: string | null = null;
  success = false;
  showPassword = false;
 
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name:      ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      username:  ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_.-]+$/)]],
      password:  ['', [Validators.required, Validators.minLength(8)]],
      active:    [true],
    });
  }
 
  // Shorthand helpers
  field(name: string): AbstractControl { return this.form.get(name)!; }
 
  hasError(name: string, error: string): boolean {
    const ctrl = this.field(name);
    return ctrl.invalid && ctrl.touched && ctrl.hasError(error);
  }
 
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
 
    this.loading = true;
    this.error = null;
 
    this.userService.create(this.form.value).subscribe({
      next: (user) => {
        this.success = true;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/user', user.id]), 1200);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }

}

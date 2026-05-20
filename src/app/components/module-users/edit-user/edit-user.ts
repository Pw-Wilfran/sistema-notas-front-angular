import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../core/interface/user.model';
import { UserService } from '../../../core/services/User.Service';

@Component({
  selector: 'app-edit-user',
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss',
})
export class EditUser implements OnInit {

  form!: FormGroup;
  user!: User;
  userId!: number;
 
  loadingUser = true;
  loading = false;
  error: string | null = null;
  success = false;
  showPassword = false;
  changePassword = false;
 
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadUser();
  }
 
  private initForm(): void {
    this.form = this.fb.group({
      name:      ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email:     ['', [Validators.required, Validators.email]],
      username:  ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9_.-]+$/)]],
      password:  [''],
      active:    [true],
    });
  }
 
  private loadUser(): void {
    this.userService.getById(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.form.patchValue({
          name:      user.name,
          last_name: user.last_name,
          email:     user.email,
          username:  user.username,
          active:    user.active,
        });
        this.loadingUser = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loadingUser = false;
      },
    });
  }
 
  toggleChangePassword(): void {
    this.changePassword = !this.changePassword;
    const ctrl = this.form.get('password')!;
 
    if (this.changePassword) {
      ctrl.setValidators([Validators.required, Validators.minLength(8)]);
    } else {
      ctrl.clearValidators();
      ctrl.setValue('');
    }
    ctrl.updateValueAndValidity();
  }
 
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
 
    const payload = { ...this.form.value };
    if (!this.changePassword) delete payload.password;
 
    this.userService.update(this.userId, payload).subscribe({
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

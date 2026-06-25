import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../core/services/Student.Service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-student',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './new-student.html',
  styleUrl: './new-student.scss',
})
export class NewStudent implements OnInit {

  form!: FormGroup;

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    activate: [true],

    document: ['', Validators.required],
    birth_date: [''],
    phone: [''],

    is_active: [true]
    });
  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';

    this.studentService.create(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },

      error: (err) => {
        this.error = err.error.message || 'Error al crear estudiante';
        this.loading = false;
      }
    });
  }

}

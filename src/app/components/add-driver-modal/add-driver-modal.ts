import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-driver-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './add-driver-modal.html',
  styleUrl: './add-driver-modal.scss',
})
export class AddDriverModalComponent {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<any>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    patronymic: ['', Validators.required],
    experience: 0,
  });

  addDriver() {
    this.form.markAllAsTouched();
    if (
      !this.form.controls.surname.errors &&
      !this.form.controls.name.errors &&
      !this.form.controls.patronymic.errors
    )
      this.onAdd.emit({
        surname: this.form.controls.surname.value,
        name: this.form.controls.name.value,
        patronymic: this.form.controls.patronymic.value,
        experience: this.form.controls.experience.value,
      });
  }

  cancel() {
    this.onCancel.emit();
  }
}

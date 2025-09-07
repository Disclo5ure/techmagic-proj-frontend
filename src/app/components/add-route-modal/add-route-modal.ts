import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-route-modal',
  imports: [
    CommonModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './add-route-modal.html',
  styleUrl: './add-route-modal.scss',
})
export class AddRouteModal {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<any>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    distance: ['', Validators.required],
    days: ['', Validators.required],
    cost: ['', Validators.required],
  });

  addRoute() {
    this.form.markAllAsTouched();
    if (
      !this.form.controls.name.errors &&
      !this.form.controls.distance.errors &&
      !this.form.controls.days.errors &&
      !this.form.controls.cost.errors
    )
      this.onAdd.emit({
        name: this.form.controls.name.value,
        distance: this.form.controls.distance.value,
        days: this.form.controls.days.value,
        cost: this.form.controls.cost.value,
      });
  }

  cancel() {
    this.onCancel.emit();
  }
}

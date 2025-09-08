import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DriversService } from '../../services/drivers.service';
import { RoutesService } from '../../services/routes.service';
import { IDriver } from '../../models/IDriver';
import { IRoute } from '../../models/IRoute';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInput } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import dayjs from 'dayjs';

@Component({
  selector: 'app-add-trip-modal',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelectModule,
    MatCheckbox,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
  ],
  templateUrl: './add-trip-modal.html',
  styleUrl: './add-trip-modal.scss',
})
export class AddTripModal implements OnInit {
  @Output() onCancel = new EventEmitter<void>();
  @Output() onAdd = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  private driversService = inject(DriversService);
  private routesService = inject(RoutesService);

  drivers!: IDriver[];
  routes!: IRoute[];

  form = this.fb.nonNullable.group({
    route: ['', Validators.required],
    drivers: [[], Validators.required],
    startDate: ['', Validators.required],
    cost: 0,
    bounty: 0,
    countExperience: { value: false, disabled: true },
  });

  ngOnInit(): void {
    this.driversService.getAll();
    this.driversService.drivers$.subscribe((drivers) => (this.drivers = drivers));
    this.routesService.getAll();
    this.routesService.routes$.subscribe((routes) => (this.routes = routes));
    console.log(this.form.controls.drivers.value);
    console.log(this.form.controls.drivers.value[0] === '');
  }

  maxSelections = 2;

  isDriverOptionDisabled(id: string): boolean {
    const selectedDriversIds = this.form.controls.drivers.value as string[];
    return selectedDriversIds.length >= this.maxSelections && !selectedDriversIds.includes(id);
  }

  multiplier = 1;

  setCost() {
    const selectedRouteId = this.form.controls.route.value || '';
    if (selectedRouteId) {
      const selectedRouteObj = this.routes.find((route) => route._id === selectedRouteId) as IRoute;
      this.form.get('cost')?.setValue(selectedRouteObj.cost * this.multiplier);
    }
  }

  setMultiplier() {
    if (this.form.controls.countExperience.value) {
      this.multiplier = 1;
      const selectedDriversIds = this.form.controls.drivers.value as string[];
      selectedDriversIds.forEach((driverId) => {
        const selectedDriver = this.drivers.find((driver) => driver._id === driverId) as IDriver;
        this.multiplier += selectedDriver.experience / 10;
        this.setBounty();
      });
    } else {
      this.multiplier = 1;
      this.setBounty();
    }
    this.setCost();
  }

  setBounty() {
    this.form
      .get('bounty')
      ?.setValue(this.form.controls.cost.value * this.multiplier - this.form.controls.cost.value);
  }

  resetMultiplier() {
    const selectedDriversIds = this.form.controls.drivers.value as string[];
    if (selectedDriversIds.length === 0) {
      this.multiplier = 1;
      this.form.get('countExperience')?.setValue(false);
      this.setCost();
    } else this.setMultiplier();
  }

  endDate = dayjs();

  setEndDate() {
    if (this.form.controls.route.value) {
      const selectedRoute = this.routes.find(
        (route) => route._id === this.form.controls.route.value,
      ) as IRoute;
      const date = dayjs(this.form.controls.startDate.value);
      this.endDate = date.add(selectedRoute.days, 'day');
    }
  }

  handleRouteChange() {
    this.setCost();
    if (this.form.controls.startDate.value) this.setEndDate();
  }

  addTrip() {
    this.form.markAllAsTouched();
    if (
      !this.form.controls.route.errors &&
      !this.form.controls.drivers.errors &&
      !this.form.controls.startDate.errors &&
      !this.form.controls.cost.errors
    )
      this.onAdd.emit({
        route: this.form.controls.route.value,
        drivers: this.form.controls.drivers.value,
        startDate: this.form.controls.startDate.value,
        endDate: this.endDate,
        bounty: this.form.controls.bounty.value,
      });
  }

  cancel() {
    this.onCancel.emit();
  }
}

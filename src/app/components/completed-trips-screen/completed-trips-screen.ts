import { Component, inject, OnInit } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { TripsService } from '../../services/trips.service';
import { IAddedTrip, ITrip } from '../../models/ITrip';
import { AddTripModal } from '../add-trip-modal/add-trip-modal';
import { IDriver } from '../../models/IDriver';

@Component({
  selector: 'app-completed-trips-screen',
  imports: [
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatRowDef,
    MatRow,
    AsyncPipe,
    MatButton,
    AddTripModal,
    DatePipe,
  ],
  templateUrl: './completed-trips-screen.html',
  styleUrl: './completed-trips-screen.scss',
})
export class CompletedTripsScreen implements OnInit {
  private tripsService = inject(TripsService);

  trips$ = this.tripsService.trips$;
  showModal = false;

  columnsToDisplay = ['route', 'drivers', 'startDate', 'endDate', 'bounty'];

  ngOnInit(): void {
    this.tripsService.getAll();
  }

  openAddTripModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  getDriversSurnames(drivers: IDriver[]): string {
    return drivers.map((driver) => driver.surname).join(', ');
  }

  onTripAdded(trip: IAddedTrip): void {
    this.tripsService.create(trip).subscribe(() => {
      this.closeModal();
    });
  }
}

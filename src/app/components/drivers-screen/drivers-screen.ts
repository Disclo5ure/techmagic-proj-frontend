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
import { IDriver } from '../../models/IDriver';
import { DriversService } from '../../services/drivers.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { AddDriverModalComponent } from '../add-driver-modal/add-driver-modal';

@Component({
  selector: 'app-drivers-screen',
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
    AddDriverModalComponent,
  ],
  templateUrl: './drivers-screen.html',
  styleUrl: './drivers-screen.scss',
})
export class DriversScreen implements OnInit {
  private driversService = inject(DriversService);

  drivers$ = this.driversService.drivers$;
  showModal = false;

  columnsToDisplay = ['surname', 'name', 'patronymic', 'experience'];

  ngOnInit(): void {
    this.driversService.getAll();
  }

  openAddDriverModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onDriverAdded(driver: IDriver): void {
    this.driversService.create(driver).subscribe(() => this.closeModal());
  }
}

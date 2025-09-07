import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
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
import { Observable } from 'rxjs';
import { RoutesService } from '../../services/routes.service';
import { IRoute } from '../../models/IRoute';
import { MatButton } from '@angular/material/button';
import { AddRouteModal } from '../add-route-modal/add-route-modal';

@Component({
  selector: 'app-routes-screen',
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
    AddRouteModal,
  ],
  templateUrl: './routes-screen.html',
  styleUrl: './routes-screen.scss',
})
export class RoutesScreen implements OnInit {
  private routesService = inject(RoutesService);

  routes$!: Observable<IRoute[]>;
  showModal = false;

  columnsToDisplay = ['name', 'distance', 'days', 'cost'];

  ngOnInit(): void {
    this.routes$ = this.routesService.getAll();
  }

  openAddRouteModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onRouteSaved(route: IRoute): void {
    this.routesService.create(route).subscribe();
    this.routes$ = this.routesService.getAll();
    this.closeModal();
  }
}

import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { DriversScreen } from './components/drivers-screen/drivers-screen';
import { RoutesScreen } from './components/routes-screen/routes-screen';
import { CompletedTripsScreen } from './components/completed-trips-screen/completed-trips-screen';
import { AuthPage } from './components/auth-page/auth-page';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      { path: 'drivers', component: DriversScreen },
      { path: 'routes', component: RoutesScreen },
      { path: 'completed-trips', component: CompletedTripsScreen },
      { path: '', redirectTo: 'routes', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: AuthPage },
  { path: 'registration', component: AuthPage },
  { path: '**', redirectTo: '' },
];

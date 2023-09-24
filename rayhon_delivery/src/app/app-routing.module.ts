import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutePathes } from './shared/enums/ERoutes';
import { authGuardCanActivate, authGuardCanMatch } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: AppRoutePathes.AUTH,
    loadChildren: () => import('./auth/auth.module')
      .then((mod) => mod.AuthModule),
      canActivate: [authGuardCanActivate],
      canMatch: [authGuardCanMatch]
  },
  {
    path: AppRoutePathes.PROFILE,
    loadChildren: () => import('./profile/profile.module')
      .then((mod) => mod.ProfileModule),
  },
  {
    path: AppRoutePathes.HOME,
    loadChildren: () => import('./home/home.module')
      .then((mod) => mod.HomeModule),
  },
  {
    path: AppRoutePathes.ORDERS,
    loadChildren: () => import('./orders/orders.module')
      .then((mod) => mod.OrdersModule),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

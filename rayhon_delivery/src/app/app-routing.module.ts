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
    path: '**',
    redirectTo: '/auth',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

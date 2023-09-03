import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { VerifyPhoneComponent } from './pages/verify-phone/verify-phone.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'verify_num', component: VerifyPhoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

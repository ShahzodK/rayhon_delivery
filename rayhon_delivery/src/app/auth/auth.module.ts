import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { VerifyPhoneComponent } from './pages/verify-phone/verify-phone.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { WalkthroughComponent } from './components/walkthrough/walkthrough.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    VerifyPhoneComponent,
    WalkthroughComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CarouselModule 
  ],
  providers: [provideNgxMask()]
})
export class AuthModule { }

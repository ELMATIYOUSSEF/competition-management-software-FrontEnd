import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverpwdComponent } from './recoverpwd/recoverpwd.component';

import { AuthRoutingModule } from './auth-routing';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent,  RegisterComponent, RecoverpwdComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    CarouselModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }

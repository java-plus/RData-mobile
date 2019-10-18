import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { AgeValidatorDirective } from '../validators/age-validator.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgbModule,
    RouterModule.forChild(routes)
    
  ],
  declarations: [RegisterPage, AgeValidatorDirective],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RegisterPageModule {}

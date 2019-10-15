import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeteoPage } from './meteo.page';
import { ComposantsModule } from '../composants/composants.module';

const routes: Routes = [
  {
    path: '',
    component: MeteoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComposantsModule
  ],
  declarations: [MeteoPage]
})
export class MeteoPageModule {

}

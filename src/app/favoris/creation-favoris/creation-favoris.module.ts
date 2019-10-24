import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreationFavorisPage } from './creation-favoris.page';
import {ComposantsModule} from '../../composants/composants.module';

const routes: Routes = [

];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ComposantsModule
    ],
  declarations: []
})
export class CreationFavorisPageModule {}

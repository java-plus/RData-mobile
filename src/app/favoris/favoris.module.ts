import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FavorisPage} from './favoris.page';
import {ComposantsModule} from '../composants/composants.module';

const routes: Routes = [
    {
        path: '',
        component: FavorisPage
    }
];

@NgModule({
    imports: [
        ComposantsModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [FavorisPage]
})
export class FavorisPageModule {
}

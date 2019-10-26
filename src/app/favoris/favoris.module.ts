import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FavorisPage} from './favoris.page';
import {ComposantsModule} from '../composants/composants.module';
import {CreationFavorisPage} from './creation-favoris/creation-favoris.page';

const routes: Routes = [
    {
        path: '',
        component: FavorisPage
    },
    {
        path: 'creation-favoris',
        component: CreationFavorisPage
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
    declarations: [FavorisPage, CreationFavorisPage]
})
export class FavorisPageModule {
}

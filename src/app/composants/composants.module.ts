
import {CommonModule} from '@angular/common';
import {ExpandableComponent} from './expandable/expandable.component';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import {NgModule} from '@angular/core';


@NgModule({
    declarations: [ExpandableComponent, HeaderComponent],
    imports: [
        IonicModule,
        CommonModule
    ], exports: [ExpandableComponent, HeaderComponent]
})
export class ComposantsModule {}


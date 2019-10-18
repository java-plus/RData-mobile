import {Component, Input, Renderer2} from '@angular/core';

@Component({
    selector: 'app-expandable',
    templateUrl: './expandable.component.html',
    styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent {

    @Input('expanded') expanded = false;


    constructor(public renderer: Renderer2) {
    }


}

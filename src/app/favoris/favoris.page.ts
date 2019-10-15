import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.page.html',
    styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

    public items: any = [];

    constructor() {
        this.items = [
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false}
        ];
    }

    ngOnInit() {
    }

    expandItem(item): void {
        if (item.expanded) {
            item.expanded = false;
        } else {
            this.items.map(listItem => {
                if (item === listItem) {
                    listItem.expanded = !listItem.expanded;
                } else {
                    listItem.expanded = false;
                }
            });
        }
    }
}



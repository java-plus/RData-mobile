import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  /**
   * titre du header
   * Le titre qui sera affiché dans le header.
   * Pour utilisation, il faut ajouter  ComposantsModule dans les imports du module de la page concernée
   *@example <app-header titreHeader="titre a afficher"></app-header>
   */
  @Input() titreHeader: string;

  constructor() { }

  ngOnInit() { }

}

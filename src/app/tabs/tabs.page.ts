import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: []
})
export class TabsPage {

  constructor(private loginService: LoginService, private router: Router) { }

  /**
   * deconnexion de l’utilisateur  et redirection vers la page de login
   */
  deconnecter() {
    this.loginService.deconnexion().subscribe(() => { this.router.navigate(['/login']); });
  }

}

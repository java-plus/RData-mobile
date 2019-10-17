import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: []
})
export class TabsPage {

  constructor(private loginService: LoginService, private router: Router, public alertController: AlertController) { }


  async alerteConfirmationDeconnexion() {
    const alert = await this.alertController.create({
      header: 'Déconnexion',
      message: 'Vous allez être déconnecté',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confimer',
          handler: () => {
            this.deconnecter();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * deconnexion de l’utilisateur  et redirection vers la page de login
   */
  deconnecter() {
    this.loginService.deconnexion().subscribe(() => { this.router.navigate(['/login']); });
  }

}

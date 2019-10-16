import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommunesService } from '../services/commune.service';

import { flatMap, map } from 'rxjs/operators';
import Commune from '../model/Commune';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


interface CommuneGeoApi{
  nom:string,
  code:string
}

/**
 * Classe représentant la page de création de compte (url: /register)
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: [],
})
export class RegisterPage implements OnInit {

  // Variable représentant la commune que l'utilisateur renseigne sur le formaulaire création de compte
  communeRecupere: CommuneGeoApi;
  messageError: string;
  messageErrorCommune: string;
  password: string;
  confirmationPassword: string;

  constructor(private loginService: LoginService, private router: Router, private communeService: CommunesService, private registerService: RegisterService) { }

  ngOnInit() {
    this.loginService.deconnexion().subscribe(() => { })

  }

  /**
   * fonction permettant d’afficher uniquement le nom de la commune dans l’autocompletion et l’input
   * @param commune la commune dont on doit recuperer le nom
   */
  recupererNomCommune(commune: Commune) {
    return commune.nom;
  }

  /**
   * fonction recuperant la liste des communes pour l’auto completion
   * @param text$ observable pour l’autocompletion
   */
  search = (text$: Observable<string>) =>
    text$.pipe(flatMap((term) =>
      this.communeService.chercherCommunes(term).pipe(
        map((listCommune) =>
          listCommune.slice(0, 5)))));


  rechercheCorrespondanceCommune(commune) {
    this.communeService.chercherCommunes(commune).pipe(map(items => items.filter(item => item.nom == commune)))
      .subscribe((resp) => {
        if (resp.length == 1) {
          this.messageErrorCommune = null;
          console.log(resp[0]);
          this.communeRecupere={
            nom:resp[0].code,
            code:resp[0].nom
          } 
          this.communeRecupere.code = resp[0].code;
          this.communeRecupere.nom = resp[0].nom;
          console.log(this.communeRecupere)

        } else if (resp.length > 1) {
          this.messageErrorCommune =
            'Plusieurs communes correspondent à celle renseignée, affinez votre recherche et sélectionnez en une dans la liste'
        } else if (resp.length == 0) {
          this.messageErrorCommune =
            'Aucune commune ne correspond à celle renseignée, affinez votre recherche et sélectionnez en une dans la liste'
        }

      })
  }


  register(form: NgForm) {
    console.log(form.value.recuperationCommune.code)
    this.registerService.creationDeCompte(
      form.value.identifiant,
      form.value.email,
      form.value.age,
      form.value.recuperationCommune.code,
      form.value.password).subscribe(() => {
        this.loginService.authentification(form.value.identifiant, form.value.password).subscribe(() => {
          this.router.navigateByUrl('');
        }, () => { });
      }, (err) => {
        err.status == 500 ?
          this.messageError = 'L\'identifiant renseigné est déjà utilisé, changez d\'identifiant' :

          this.messageError = 'Creation de compte impossible';
      });
  }

}

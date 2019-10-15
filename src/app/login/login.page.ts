import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {  NgForm } from '@angular/forms';

/**
   * représente la page login de l'application
   * 
   * 
   */
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: [],
})
export class LoginPage implements OnInit {

  // La variable "messageError" est nulle au chargement de la page.
  // Si l'utilisateur renseigne un mauvais identifiant, mot de passe ou tout ce qui pourrait empecher la connexion
  // Elle s'initialise à 'Connexion impossible avec cet identifiant et ce mot de passe' et est affichée en rouge dans le html
  messageError:string;

  /**
   * Le constructeur initialise les singletons router (pour la redirection vers d'autres urls)
   * et loginService (pour utiliser les méthodes présentes dans ce service)
   */
  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit() {
  }
  
  // La methode authentification permet de faire un POST au back contenant les informations du formulaire
  // Elle fait appel au service login.service via la méthode authentification(identifiant, motDePasse).
  // Si la requete renvoi une erreur, alors la variable this.messageError prend la valeur d'un message d'erreur qui sera affichée dans le front
  // Si la requete ne renvoie pas d'erreur, l'utilisateur est redirigée vers une url vue qui correspond à l'url "/secure/meteo"
  authentification(form:NgForm) {
    
    this.loginService.authentification(form.value.name, form.value.password).subscribe(() => {
      this.router.navigateByUrl('');
    }, () => {
      this.messageError = 'Connexion impossible avec cet identifiant et ce mot de passe';
      
    });
  }
  

}

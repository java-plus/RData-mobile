import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  messageError:string;
  messageTentative:string;

  constructor(private router:Router,private loginService:LoginService) { }

  ngOnInit() {
  }
  
  authentification(form:NgForm) {
    
    this.loginService.authentification(form.value.name, form.value.password).subscribe(() => {
      this.router.navigateByUrl('');
    }, () => {
      this.messageError = 'Connexion impossible avec cet identifiant et ce mot de passe';
      
    });
  }
  test(form:NgForm){
    console.log(form.value.name)
    console.log(form.value.email)
    console.log(form.value.password)
    console.log(form.value.confirm)

    console.log(form.value)
  }

}

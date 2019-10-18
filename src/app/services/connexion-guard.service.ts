import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanActivateChild } from '@angular/router';


import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class ConnexionGuardService implements CanActivateChild {
  

  constructor(private router: Router, private authService: LoginService) { }

  /**
   * verifie si l’utilisateur est connecté, si il l’est le gardien laisse passé, sinon il est redirigé sur /login
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean | UrlTree>  {
    return this.authService.isLoggedIn().pipe(
      map(() => true)
      , catchError(() => of(this.router.parseUrl('/login'))));
    }
  }

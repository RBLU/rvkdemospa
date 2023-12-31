import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _msalService: MsalService, private _loginService: LoginService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this._msalService.instance.getAllAccounts().length == 0) {
            this._loginService.setPostLoginUrl(next.url)
            return false;
        } else {
            const userRoles = this._msalService.instance.getAllAccounts()[0].idTokenClaims.roles;
            const allowedRoles = next.data["roles"];
            const matchingRoles = userRoles.filter(x => allowedRoles.includes(x));
            return matchingRoles.length > 0;
        }
    }
}
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthProdavacService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/auth']);
      return false;
    }
    var role = this.authService.getRoleOfAuthenticatedUser();
    if (role === '[prodavac]') {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }


}

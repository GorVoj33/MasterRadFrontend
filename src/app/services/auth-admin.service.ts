import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/auth']);
      return false;
    }
    var role = this.authService.getRoleOfAuthenticatedUser();
    if (role === '[admin]') {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
}

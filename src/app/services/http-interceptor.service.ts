import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let header = this.authService.getAuthenticatedToken();
    console.log('Ukljucivanje headera: '+header)
    let username = this.authService.getAuthenticatedUser();
    console.log('Ukljucivanje username: '+username)
    if(header && username){
      req = req.clone({
        setHeaders : {
          Authorization: header
        }
      })
    }
    return next.handle(req);
  }
}

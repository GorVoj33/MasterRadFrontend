import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticatedUser';
export const ROLE = 'role';
export const ID = 'id';
export const ITEMS_NUMBER = 'items_number';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private itemsNumber = new BehaviorSubject<number>(0);
  public share = this.itemsNumber.asObservable();
  subs: any;
  selectedArticlesIds: number[] = [];
  private cart: any = null;
  constructor(private http: HttpClient) { }

  // setUserId(userId: number) {
  //   this.userId = userId;
  // }

  setCart(korpa) {
    this.cart = korpa;
  }
  isArticleInCart(id: number) {
    if(this.selectedArticlesIds.includes (id)) return true;
    else return false;
  }
  getCart() {

    if(this.cart === null) {
      console.log('ucitavanje korpe iz baze');
      this.subs = this.http.get(`http://localhost:8080/rest/korpa/id/${this.getAuthenticatedUserId()}/drugi`).subscribe(
        reponse => {
          this.setCart(reponse['object']);
        }
      );
    }
    return this.cart;
  }


  updateItemsNumber(newNumber){
    this.itemsNumber.next(newNumber);
    sessionStorage.setItem(ITEMS_NUMBER, ''+this.getItemsNumber());
  }
  getItemsNumber(){
    return this.itemsNumber.value;
  }
  executeJwtAuthentication(username, password) : Observable<any>{
    return this.http.post<any>('http://localhost:8080/authenticate', {username, password})
    .pipe(
      map(
        data => {
          console.log('Odgovor na autentifikaciju: ', data)
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          console.log('username: '+username)
          sessionStorage.setItem(TOKEN, `Bearer ${data.token}`);
          console.log('token: '+data.token)
          sessionStorage.setItem(ROLE, data.role);
          console.log('rola: '+data.role)
          sessionStorage.setItem(ID, data.userId);
          console.log('id: '+data.userId)
          sessionStorage.setItem(ITEMS_NUMBER, data.cartItems);
          this.updateItemsNumber(data.cartItems);
          this.selectedArticlesIds = data.selectedArticles;
          console.log('selektovani artikli')
          console.log(this.selectedArticlesIds)
        }
      )
    );
  }
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }
  getAuthenticatedUserId() {
    if (this.getAuthenticatedUser()) {
      return +sessionStorage.getItem(ID);
    }

  }
  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }

  }
  getRoleOfAuthenticatedUser() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(ROLE);
    }
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }
  async logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(ROLE);
    sessionStorage.removeItem(ID);
  }
}

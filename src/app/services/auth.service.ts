import { Injectable } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  korpaId: number = 1;
  userId: number = 1;
  private korpa: any = null;
  brojStavkiUKorpi = 0;
  constructor(private http: HttpClient) { }
  public vratiIdKorpeUlogovanog() {
    return this.korpaId;
  }
  setKorpa(korpa) {
    this.korpa = korpa;
  }
  getKorpa() {
    if(this.korpa === null) {
      var korpa = this.http.get (`http://localhost:8080/korpa/id/${this.userId}/drugi`).subscribe(
        reponse => {
          this.korpa = reponse['object'];
        }
      );


    }
    return this.korpa;
  }
  getBrojStavki() {
    return this.brojStavkiUKorpi;
  }
}

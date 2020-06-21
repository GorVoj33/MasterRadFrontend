import { Injectable } from '@angular/core';
import { Pakovanje } from '../classes/pakovanje.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoginAttemptDto } from '../dtos/loginAttemptDto.model';
import { RegistracijaProdavcaDto } from '../dtos/registracijaProdavcaDto.model';
import { RegistracijaKupcaDto } from '../dtos/registracijaKupcaDto.model';
import { Grad } from '../classes/grad.model';
import { ArtikalOsnovnoDto } from '../dtos/artikalOsnovnoDto.model';
import { Kategorija } from '../classes/kategorija.model';
import { Artikal } from '../classes/artikal.model';
import { NovaKategorijaDto } from '../dtos/novaKategorijaDto.model';
import { ServerResponse } from '../dtos/serverResponse.model';
import { ArtikalDetailDto } from '../dtos/artikalDetailDto.model';
import { NovaStavkaKorpeDto } from '../dtos/novaStavkaKorpeDto.model';
import { KategorijaMeniDto } from '../shared/navbar/navbar.component';
import { AuthService } from './auth.service';
import { OrderDetalji } from '../dtos/orderDetalji.model';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  posaljiZahtevZaOdobravanjeKorisnika(idKorisnika: any) {
    return this.http.get(`http://localhost:8080/odobriRegistraciju/${idKorisnika}`);
  }
  ucitajOsnovneInformacije() {
    return this.http.get('http://localhost:8080/artikli/informacije');
  }
  ucitajUkupanPrihod() {
    return this.http.get(`http://localhost:8080/narudzbina/suma`);
  }
  ucitajOdbijeneNarudzbine() {
    return this.http.get(`http://localhost:8080/narudzbina/vratiOdbijene`);
  }
  ucitajPrihvaceneNarudzbine() {
    return this.http.get(`http://localhost:8080/narudzbina/vratiOdobrene`);
  }
  ucitajPrihvaceneProdavce() {
    return this.http.get(`http://localhost:8080/prodavci/prihvaceni`);
  }
  ucitajNePrihvaceneProdavce() {
    return this.http.get(`http://localhost:8080/prodavci/odbijeni`);
  }
  ucitajPrihvaceneKupce() {
    return this.http.get(`http://localhost:8080/kupci/prihvaceni`);
  }
  ucitajNePrihvaceneKupce() {
    return this.http.get(`http://localhost:8080/kupci/odbijeni`);
  }
  odbijNarudzbinu(order: any) {
    return this.http.get(`http://localhost:8080/narudzbina/${order.id}/odbijanje`);
  }
  prihvatiNarudzbinu(order: any) {
    return this.http.get(`http://localhost:8080/narudzbina/${order.id}/prihvatanje`);
  }
  ucitajSveNarudzbine(userId) {
    return this.http.get<OrderDetalji[]>(`http://localhost:8080/narudzbina/korisnikId/${userId}`);
  }
  vratiProfilPremaId(profileId: number) {
    return this.http.get(`http://localhost:8080/prodavac/id/${profileId}`);
  }
  ucitajArtiklePremaProdavacId(prodavacId: number){
    return this.http.get<ArtikalOsnovnoDto[]>(`http://localhost:8080/artikli/prodavacId/${prodavacId}`);
  }
  ucitajSveProfile() {
    return this.http.get('http://localhost:8080/korisnici/vratiProdavce');
  }
  ucitajKategorijeZaMeni() {
    return this.http.get<KategorijaMeniDto[]>('http://localhost:8080/kategorija/vratiSveKategorijeBezSlike');

  }
  dodajStavkuUKorpu(novaStavka: NovaStavkaKorpeDto) {
    return this.http.post(`http://localhost:8080/korpa/${novaStavka.korpaId}/dodajArtikal`, novaStavka);
  }
  obrisiStavkuKopre(korpaId: number, stavkaId: any) {
    return this.http.get (`http://localhost:8080/korpa/id/${korpaId}/izbaci/${stavkaId}`);
  }
  ucitajKorpu(id: number) {

    var korpa = this.http.get (`http://localhost:8080/korpa/id/${id}/drugi`);
    this.auth.setKorpa(korpa);
    return korpa;
  }

  ucitajKategorije() {
    return this.http.get<Kategorija>('http://localhost:8080/kategorija/2');
  }
  sacuvajSlikuZaKategoriju(id: number, slikaZaUpload: FormData) {
    return this.http.post(`http://localhost:8080/kategorija/${id}/sacuvajSliku`, slikaZaUpload);
  }
  sacuvajNovuKategoriju(novaKategorija: NovaKategorijaDto) {
    return this.http.post<ServerResponse>('http://localhost:8080/kategorija/dodajKategoriju', novaKategorija);
  }
  vratiListuGradova(){
    return this.http.get<Grad[]>('http://localhost:8080/vratiListuGradova');
  }
  constructor(private http: HttpClient, private auth: AuthService) { }

  vratiSveArtikle() {
    return this.http.get<ArtikalOsnovnoDto[]>('http://localhost:8080/artikli/osnovno/svi');
  }

  vratiArtikalPoID(id: number) {
    return this.http.get<ArtikalDetailDto>(`http://localhost:8080/artikal/${id}`);
  }

  login(lad: LoginAttemptDto) {
    console.log('Poslat zahtev za login')
    return this.http.post('http://localhost:8080/login', lad);
  }

  registrujProdavca(noviProdavac: RegistracijaProdavcaDto) {
    return this.http.post('http://localhost:8080/registrujProdavca', noviProdavac);
  }

  registrujKupca(noviKupac: RegistracijaKupcaDto) {
    return this.http.post('http://localhost:8080/registracijaKupca', noviKupac);
  }
  dodajArtikal(art: Artikal) {
    return this.http.post('http://localhost:8080/dodajArtikal', art);
  }
  sacuvajSlikuArtikla(artikalId: number, uploadImageData: FormData) {
    console.log('Slika kategorije:' )
    console.log(uploadImageData)
    return this.http.post<ServerResponse>(`http://localhost:8080/artikal/${artikalId}/sacuvajSliku`, uploadImageData);
  }
  sacuvajNarudzbine(order) {
    return this.http.post('http://localhost:8080/narudzbina/dodaj', order);
  }
}

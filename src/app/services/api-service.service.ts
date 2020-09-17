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
import { KomentarDto } from '../dtos/komentarDto.model';
import { PodaciZaGradDto } from '../dtos/podaciZaGrad.model';
import { PromenaKolicineDto } from '../dtos/promenaKolicine.model';
import { MesecnaStatistikaDto } from '../dtos/mesecnaStatistika.model';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  sveKategorije: Kategorija[] = [];
  kategorijeUcitane: boolean = false;
  // ucitajSveKategorije () {
  //   if(this.sveKategorije.length === 0) {
  //     this.http.get<Kategorija[]>('http://localhost:8080/rest/kategorija/vratiSve').subscribe(
  //       kategorije => {

  //         this.sveKategorije = kategorije;
  //         return this.sveKategorije;
  //       }
  //     )
  //   }
  //   else return this.sveKategorije
  // }
  setKategorije(kategorije: Kategorija[]) {
    console.log('pozivam seter')
    this.sveKategorije = kategorije;
  }
  getKategorije() {
    console.log('pozivam geter')
    return this.sveKategorije;
  }
  ucitajSveKategorije () {
    return this.http.get<Kategorija[]>('http://localhost:8080/rest/kategorija/vratiSve');
  }
  ucitajPonovoKategorije(){
    if(!this.kategorijeUcitane) {
      return this.http.get<Kategorija[]>('http://localhost:8080/rest/kategorija/vratiSve');
    }else {
      return this.sveKategorije;
    }
  }
  promeniKolicinu(promenaKolicineObjekat: PromenaKolicineDto) {
    return this.http.post <ServerResponse>('http://localhost:8080/rest/korpa/promeniKolicinu', promenaKolicineObjekat);
  }
  izmeniArtikal(product: ArtikalDetailDto) {
    return this.http.post(`http://localhost:8080/rest/artikal/${product.id}/izmeni`, product);
  }
  istakniArtikal(product: ArtikalDetailDto) {
    return this.http.get(`http://localhost:8080/rest/artikal/${product.id}/istakni`);
  }

  ucitajMesecnuStatistiku() {
    return this.http.get<ServerResponse>(`http://localhost:8080/rest/narudzbina/mesecneStatistike`);
  }

  deaktivirajArtikal(product: any) {
    return this.http.get(`http://localhost:8080/rest/artikal/${product.id}/deaktiviraj`);
  }
  aktivirajArtikal(product: any) {
    return this.http.get(`http://localhost:8080/rest/artikal/${product.id}/aktiviraj`);
  }
  ucitajSveNarudzbineZaProdavca(userId: number) {
    return this.http.get<OrderDetalji[]>(`http://localhost:8080/rest/narudzbina/prodavacId/${userId}`);
  }
  ucitajIstaknuteArtikle() {
    return this.http.get(`http://localhost:8080/rest/artikal/artikli/osnovno/istaknuti`);
  }
  sacuvajKomentar(id: number, noviKomentarObj: KomentarDto) {
    return this.http.post(`http://localhost:8080/rest/artikal/artikli/dodajKomentar/${id}`, noviKomentarObj);
  }
  sacuvajSlikuKorisnika(korisnikId, slika) {
    return this.http.post(`http://localhost:8080/rest/korisnik/${korisnikId}/sacuvajSliku`, slika);
  }


  ucitajPodatkeOGradovima() {
    return this.http.get<PodaciZaGradDto[]>('http://localhost:8080/rest/gradovi/sveInformacije');
  }
  ucitajKomentareArtikla(id: number) {
    return this.http.get(`http://localhost:8080/rest/artikal/komentari/${id}`);
  }
  posaljiZahtevZaOdobravanjeKorisnika(idKorisnika: any) {
    return this.http.get(`http://localhost:8080/rest/odobriRegistraciju/${idKorisnika}`);
  }
  ucitajOsnovneInformacije() {
    return this.http.get('http://localhost:8080/rest/artikal/artikli/informacije');
  }
  ucitajUkupanPrihod() {
    return this.http.get(`http://localhost:8080/rest/narudzbina/suma`);
  }
  ucitajOdbijeneNarudzbine() {
    return this.http.get(`http://localhost:8080/rest/narudzbina/vratiOdbijene`);
  }
  ucitajPrihvaceneNarudzbine() {
    return this.http.get(`http://localhost:8080/rest/narudzbina/vratiSveOdobrene`);
  }
  ucitajPrihvaceneProdavce() {
    return this.http.get(`http://localhost:8080/rest/prodavci/prihvaceni`);
  }
  ucitajNePrihvaceneProdavce() {
    return this.http.get(`http://localhost:8080/rest/prodavci/odbijeni`);
  }
  ucitajPrihvaceneKupce() {
    return this.http.get(`http://localhost:8080/rest/kupci/prihvaceni`);
  }
  ucitajNePrihvaceneKupce() {
    return this.http.get(`http://localhost:8080/rest/kupci/odbijeni`);
  }
  odbijNarudzbinu(order: any) {
    return this.http.get(`http://localhost:8080/rest/narudzbina/${order.id}/odbijanje`);
  }
  prihvatiNarudzbinu(order: any) {
    return this.http.get(`http://localhost:8080/rest/narudzbina/${order.id}/prihvatanje`);
  }
  ucitajSveNarudzbine(userId) {
    return this.http.get<OrderDetalji[]>(`http://localhost:8080/rest/narudzbina/kupacId/${userId}`);
  }
  vratiProfilPremaId(profileId: number) {
    return this.http.get(`http://localhost:8080/rest/prodavac/id/${profileId}`);
  }
  ucitajArtiklePremaProdavacId(prodavacId: number){
    return this.http.get<ArtikalOsnovnoDto[]>(`http://localhost:8080/rest/artikal/artikli/prodavacId/${prodavacId}`);
  }
  ucitajSveProfile() {
    return this.http.get('http://localhost:8080/rest/korisnici/vratiProdavce');
  }

  dodajStavkuUKorpu(novaStavka: NovaStavkaKorpeDto) {
    return this.http.post(`http://localhost:8080/rest/korpa/${novaStavka.korpaId}/dodajArtikal`, novaStavka);
  }
  obrisiStavkuKopre(korpaId: number, stavkaId: any) {
    return this.http.get (`http://localhost:8080/rest/korpa/id/${korpaId}/izbaci/${stavkaId}`);
  }

  ucitajKategorije() {
    return this.http.get<Kategorija>('http://localhost:8080/rest/kategorija/vratiSveKategorijeBezSlike');
  }
  sacuvajSlikuZaKategoriju(id: number, slikaZaUpload: FormData) {
    return this.http.post(`http://localhost:8080/rest/kategorija/${id}/sacuvajSliku`, slikaZaUpload);
  }
  sacuvajNovuKategoriju(novaKategorija: NovaKategorijaDto) {
    return this.http.post<ServerResponse>('http://localhost:8080/rest/kategorija/dodajKategoriju', novaKategorija);
  }
  vratiListuGradova(){
    return this.http.get<Grad[]>('http://localhost:8080/rest/vratiListuGradova');
  }
  constructor(private http: HttpClient, private auth: AuthService) { }

  vratiSveArtikle() {
    return this.http.get<ArtikalOsnovnoDto[]>('http://localhost:8080/rest/artikal/artikli/osnovno/svi');
  }

  vratiArtikalPoID(id: number) {
    return this.http.get<ArtikalDetailDto>(`http://localhost:8080/rest/artikal/${id}`);
  }

  // login(lad: LoginAttemptDto) {
  //   console.log('Poslat zahtev za login')
  //   return this.http.post('http://localhost:8080/rest/login', lad);
  // }

  registrujProdavca(noviProdavac: RegistracijaProdavcaDto) {
    return this.http.post('http://localhost:8080/rest/registrujProdavca', noviProdavac);
  }

  registrujKupca(noviKupac: RegistracijaKupcaDto) {
    return this.http.post('http://localhost:8080/rest/registracijaKupca', noviKupac);
  }
  dodajArtikal(art: Artikal) {
    return this.http.post('http://localhost:8080/rest/artikal/dodajArtikal', art);
  }
  sacuvajSlikuArtikla(artikalId: number, uploadImageData: FormData) {
    console.log('Slika kategorije:' )
    console.log(uploadImageData)
    return this.http.post<ServerResponse>(`http://localhost:8080/rest/artikal/${artikalId}/sacuvajSliku`, uploadImageData);
  }
  sacuvajNarudzbine(order) {
    return this.http.post('http://localhost:8080/rest/narudzbina/dodaj', order);
  }

  ucitajKorpu(id: number) {
    return this.http.get (`http://localhost:8080/rest/korpa/id/${id}/drugi`);
  }
}

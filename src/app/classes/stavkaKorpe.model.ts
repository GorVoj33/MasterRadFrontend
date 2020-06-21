import { Artikal } from './artikal.model';
import { Korpa } from './korpa.model';

export class StavkaKorpe {
  artikal: Artikal;
  kolicina: number;
  cenaStavke: number;
  korpa: Korpa;

  constructor(art: Artikal, kol: number, cena: number, korpa: Korpa) {
    this.artikal = art;
    this.kolicina = kol;
    this.cenaStavke = cena;
    this.korpa = korpa;
  }
}

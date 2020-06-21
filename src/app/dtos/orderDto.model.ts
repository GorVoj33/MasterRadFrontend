import { Grad } from '../classes/grad.model';
import { StavkeKorpePremaProdavcu } from './StavkeKorpePremaProdavcu.model';
import { KorpaDto } from './korpaDto.model';

export class OrderDto {
  id: number;
  ukupnaVrednost: number;
  odobrena: boolean;
  kupac: any;
  datumKreiranja: Date;
  datumOdobravanja: Date;
  adresa: string;
  grad: Grad;
  alternativniKontaktTelefon: string;
  korpa: KorpaDto;
  constructor(id, vrednost, korpa, odobrena, kupac, datum1, datum2, adresa, grad, altKontakt) {
    this.id = id;
    this.ukupnaVrednost = vrednost;
    this.odobrena = odobrena;
    this.korpa = korpa;
    this.kupac = kupac;
    this.datumKreiranja = datum1;
    this.datumOdobravanja = datum2;
    this.adresa = adresa;
    this.grad = grad;
    this.alternativniKontaktTelefon = altKontakt;
  }
}



import { Grad } from '../classes/grad.model';

export class RegistracijaProdavcaDto {

  imeprodavca: string;
  prezimeprodavca: string;
  emailprodavca: string;
  lozinka: string;
  kontaktprodavca: string;
  minIznos: number;
  ulicaprodavca: string;
  opis: string;
  direktnaDostava: boolean;
  kurirskaDostava: boolean;
  grad: Grad;
  nazivGazdinstva?: string;
  constructor(ime, prezime, email,lozinka, kontakt, minIznos, ulica, opis, dd: boolean, kd: boolean, grad: Grad, naziv?) {
    this.nazivGazdinstva = naziv;
    this.imeprodavca = ime;
    this.prezimeprodavca = prezime;
    this.emailprodavca = email;
    this.lozinka = lozinka;
    this.kontaktprodavca = kontakt;
    this.minIznos = minIznos;
    this.ulicaprodavca = ulica;
    this.opis = opis;
    this.direktnaDostava = dd;
    this.kurirskaDostava = kd;
    this.grad = grad;
  }
}

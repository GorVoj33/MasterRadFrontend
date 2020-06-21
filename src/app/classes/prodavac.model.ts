import { Grad } from './grad.model';

export class Prodavac {
  ime: string;
  prezime: string;
  email: string;
  lozinka: string;
  kontakt: string;
  grad: Grad;
  ulica: string;
  gazdinstvo?: string;
  opis?: string;

  constructor(ime: string, prezime: string, email: string, lozinka: string, kontakt: string, grad: Grad, ulica: string, gazdinstvo?: string, opis?: string) {
      this.ime = ime;
      this.prezime = prezime;
      this.email = email;
      this.lozinka = lozinka;
      this.kontakt = kontakt;
      this.grad = grad;
      this.ulica = ulica;
      this.gazdinstvo = gazdinstvo;
      this.opis = opis;
  }
}

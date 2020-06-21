import { Grad } from './grad.model';

export class Kupac {
  ime: string;
  prezime: string;
  email: string;
  lozinka: string;
  kontakt: string;
  grad: Grad;
  ulica: string;

  constructor(ime: string, prezime: string, email: string, lozinka: string, kontakt: string, grad: Grad, ulica: string) {
      this.ime = ime;
      this.prezime = prezime;
      this.email = email;
      this.lozinka = lozinka;
      this.kontakt = kontakt;
      this.grad = grad;
      this.ulica = ulica;
  }
}

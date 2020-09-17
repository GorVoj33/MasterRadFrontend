export class Grad {
  ptt: number;
  naziv: string;
  brojKorisnika: number;
  constructor(ptt, naziv, brojKorisnika?: number) {
    this.ptt = ptt;
    this.naziv = naziv;
    this.brojKorisnika = brojKorisnika;
  }
}

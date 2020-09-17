export class MesecnaStatistikaDto {
  godina: number;
  mesec: string;
  brojNarudzbina: number;
  ukupniPrihod: number;

  constructor(godina, mesec, brojNarudzbina, ukupniPrihod) {
    this.godina = godina;
    this.mesec = mesec;
    this.brojNarudzbina = brojNarudzbina;
    this.ukupniPrihod = ukupniPrihod;
  }
}

import { Kategorija } from '../classes/kategorija.model';

export class ArtikalOsnovnoDto {
  id: number;
  naziv: string;
  cena: string;
  kategorija: Kategorija;
  kolicina: string;
  slika: any;
  constructor(id, naziv, cena, kategorija, kolicina, slika) {
    this.id = id;
    this.naziv = naziv;
    this.cena = cena;
    this.kategorija = kategorija;
    this.kolicina = kolicina;
    this.slika = slika;
  }
}

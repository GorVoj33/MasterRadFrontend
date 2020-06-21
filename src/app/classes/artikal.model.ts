import { Kategorija } from './kategorija.model';
import { Prodavac } from './prodavac.model';
import { Slika } from '../dtos/slikaDto.model';

export class Artikal {
  id: number;
  // slika: File
  naziv: string;
  opis: string;
  cena: number;
  poreklo: string;
  kolicina: string;
  kategorija: Kategorija;
  mozeKurirom: boolean;
  prodavac: Prodavac;
  zaliha?: number;
  slika?: Slika;
  constructor (id: number, naziv: string, opis: string, cena: number, poreklo: string, kolicna: string, kategorija: Kategorija, mozeKurirom: boolean, prodavac: Prodavac, zaliha?: number, slika? : any) {
    this.id = id;
    //this.slika = slika;
    this.naziv = naziv;
    this.opis = opis;
    this.cena = cena;
    this.poreklo = poreklo;
    this.kolicina = kolicna;
    this.kategorija = kategorija;
    this.mozeKurirom = mozeKurirom;
    this.prodavac = prodavac;
    this.zaliha = zaliha;
    this.slika = slika;
  }
}

import { Artikal } from '../classes/artikal.model';

export class NovaStavkaKorpeDto {
  artikalId: number;
  korpaId: number;
  kolicina: number;
  constructor(artikalId, korpaId, kol) {
    this.artikalId = artikalId;
    this.korpaId = korpaId;
    this.kolicina = kol;
  }
}

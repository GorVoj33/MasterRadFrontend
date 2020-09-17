import { Slika } from '../dtos/slikaDto.model';

export class Kategorija {
  id: number;
  naziv: string;
  slika?: Slika;
  brojArtikala?: number
  constructor(id, naziv, slika?, brojArtikala?: number) {
    this.id = id;
    this.naziv = naziv;
    this.slika = slika;
    this.brojArtikala = brojArtikala;
  }
}

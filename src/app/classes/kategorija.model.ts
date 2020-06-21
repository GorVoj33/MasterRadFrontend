import { Slika } from '../dtos/slikaDto.model';

export class Kategorija {
  id: number;
  naziv: string;
  slika?: Slika;
  constructor(id, naziv, slika?) {
    this.id = id;
    this.naziv = naziv;
    this.slika = slika;
  }
}

import { Slika } from './slikaDto.model';

export interface ArtikalDetailDto{
  brojKomentara: number;
  cena: number;
  id: number;
  kategorija: {
    id: number;
    naziv: string;
  };
  kolicina: string;
  naziv: string;
  opis: string;
  poreklo: string;
  prodavac: {
    id;
    ime;
    prezime;
    kurirskaIsporuka: boolean;
    gazdinstvo: string;
    direktnaIsporuka: boolean;
  };
  slanjeKuriromMoguce;
  slika: Slika;
  zaliha: number;
}

import { Prodavac } from '../classes/prodavac.model';
import { StavkaKorpe } from '../classes/stavkaKorpe.model';

export class StavkeKorpePremaProdavcu {
  prodavac: Prodavac;
  stavke: StavkaKorpe[];
  constructor(prodavac, stavke) {
    this.prodavac = prodavac;
    this.stavke = stavke;
  }

}

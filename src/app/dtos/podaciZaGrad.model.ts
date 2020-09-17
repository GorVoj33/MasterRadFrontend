import { Grad } from '../classes/grad.model';

export class PodaciZaGradDto {
  grad: Grad;
  brojProdavaca: number;
  brojNarudzbina: number;
  constructor(grad: Grad, brojProdavaca: number, brojNarudzbina: number) {
    this.grad = grad;
    this.brojProdavaca = brojProdavaca;
    this.brojNarudzbina = brojNarudzbina;
  }
}

export class PromenaKolicineDto {
  stavkaId: number;
  artikalId: number;
  staraKolicina: number;
  novaKolicina: number;

  constructor (stavkaId, artikalId, staraKolicina, novaKolicina) {
    this.stavkaId = stavkaId;
    this.artikalId =  artikalId;
    this.staraKolicina = staraKolicina;
    this.novaKolicina= novaKolicina;
  }
}

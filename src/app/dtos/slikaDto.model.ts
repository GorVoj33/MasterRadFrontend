export class Slika {
  id: number;
  naziv: string;
  tip: string;
  picByte: string;
  constructor(id, naziv, tip, picByte){
    this.id = id;
    this.naziv = naziv;
    this.tip = tip;
    this.picByte = picByte;
  }
}

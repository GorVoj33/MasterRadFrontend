export class KorpaDto {
  id: number;
  brojStavki: number;
  ukupnaVrednost;
  stavke: {
    artikli: {
      artikal: {
        id, cena, kategorija, kolicina, vrednost, naziv, moguceSlanjeKurirom, slika: {
          id, naziv, naziv_objekta, picByte, tip
        },

      },
      kolicina,
      vrednost,
      stavkaId
    } [],
    prodavac: {
      id, ime, prezime, gazdinstvo, direktnaIsporuka, kurirskaIsporuka
    },
    kurirski: boolean,
    direktno: boolean,
    moguceKurirski: boolean,
    izabranaDostava,
    ukupnaVrednost: number
  }[];
}






export interface OrderDetalji {
  id: number;
  datumKreiranja: Date;
  ukupnaVrednost: number;
  ulica: string;
  napomena: string;
  grad: {
      ptt: number;
      naziv: string;
      brojKorisnika: number;
  };
  nacinIsporuke: string;
  odobrena: boolean;
  datumOdobrenja: Date,
  datumOdbijanja: Date,
  prodavac: {
      id: number,
      email: string,
      ime: string,
      prezime: string,
      odobren: boolean,
      kontakt: string,
      ulica: string,
      nazivGazdinstva: string,
      opis: string,
        grad: {
          ptt: number,
          naziv: string,
          brojKorisnika: number
      },
      minimalnaCenaNarudzbine: number,
      direktnaIsporukaMoguca: boolean,
      kurirskaIsporukaMoguca: boolean
  };
  kupac: {
      id: number,
      email: string,
      ime: string,
      prezime: string,
      odobren: boolean
  };
  stavke: [
      {
          id: number,
          kolicina: number,
          artikal: {
              id: number,
              naziv: string,
              opis: string,
              cena: number,
              poreklo: string,
              kolicina: string,
              datumUnosa: Date,
              aktivan: boolean,
              zaPromovisanje: boolean,
              kategorija: {
                  id: number,
                  naziv: string,
                  brojArtikala: number,
                  slika: any;
              },
              slanjeKuriromMoguce: boolean,
              slika: {
                  id: number,
                  naziv: string,
                  tip: string,
                  picByte: any;
                  naziv_objekta: string;
              },
              zaliha: number,
              prodavac: {
                  id: number;
                  email: string,
                  ime: string,
                  prezime: string;
                  odobren: boolean
                  kontakt: string,
                  ulica: string,
                  nazivGazdinstva: string,
                  opis: string,
                    grad: {
                      ptt: number,
                      naziv: string,
                      brojKorisnika: number
                  },
                  minimalnaCenaNarudzbine: number,
                  direktnaIsporukaMoguca: boolean,
                  kurirskaIsporukaMoguca: boolean
              }
          },
          cenaStavke: number
      }
  ]
}

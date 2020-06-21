export class RegistracijaKupcaDto {
  ime: string;
  prezime: string;
  email: string;
  password: string;
  constructor(ime, prezime, email, pass) {
    this.ime = ime;
    this.prezime = prezime;
    this.email = email;
    this.password = pass;
  }
}

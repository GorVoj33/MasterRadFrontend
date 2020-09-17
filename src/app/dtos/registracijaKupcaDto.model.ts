export class RegistracijaKupcaDto {
  ime: string;
  prezime: string;
  email: string;
  password: string;
  razlog: string;
  constructor(ime, prezime, email, pass, razlog) {
    this.ime = ime;
    this.prezime = prezime;
    this.email = email;
    this.password = pass;
    this.razlog = razlog;
  }
}

export class KomentarDto {

  komentar: string;
  datum: Date;
  username: string;
  constructor(komentar, datum, username) {
    this.komentar = komentar;
    this.datum = datum;
    this.username = username;
  }
}

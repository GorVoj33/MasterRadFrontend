import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
export class KategorijaMeniDto {
  id: number;
  naziv: string;
  constructor(id, naziv) {
    this.id = id;
    this.naziv = naziv;
  }
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  counter: number = 0;
  kategorije: KategorijaMeniDto[] = [];
  constructor(private api: ApiServiceService,
    private auth: AuthService) { }

  ngOnInit() {
    this.counter = this.auth.getBrojStavki();
    this.api.ucitajKategorijeZaMeni().subscribe(
      resp => {
        this.kategorije = resp;
      }
    );
  }

}

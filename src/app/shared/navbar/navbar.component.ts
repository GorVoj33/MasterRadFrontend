import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService, ROLE } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Kategorija } from 'src/app/classes/kategorija.model';
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
  sveKategorije: Kategorija[] = []
  id: number;
  userLoggedIn: boolean = false;
  prodavacLoggedIn: boolean = false;
  kupacLoggedIn: boolean = false;
  adminLoggedIn: boolean = false;
  constructor(private api: ApiServiceService,
    private auth: AuthService,
    private router: Router) {
      this.kategorije = this.api.getKategorije();
    }

  ngOnInit() {
    console.log('Ng init navbara')


    this.auth.share.subscribe(
      resp => {
        this.counter = resp;
      }
    );
    if(this.api.getKategorije().length === 0) {
      this.api.ucitajSveKategorije().subscribe(
        kategorije => {
          this.sveKategorije = kategorije;
          this.api.setKategorije(kategorije);
        }
      )
    }else {
      this.kategorije = this.api.getKategorije();
    }
    // if(this.kategorije.length === 0) {
    //   this.kategorije = this.api.getKategorije();
    // }
    this.userLoggedIn = this.auth.isUserLoggedIn();
    if(this.userLoggedIn) {
      var role = this.auth.getRoleOfAuthenticatedUser();
      switch (role) {
        case '[kupac]': this.kupacLoggedIn = true; break;
        case '[prodavac]': this.prodavacLoggedIn = true; break;
        case '[admin]': this.adminLoggedIn = true; break;
      }

    }
  }
  async logout() {
     await this.auth.logout();
     this.userLoggedIn = false;
     this.kupacLoggedIn = false;
     this.prodavacLoggedIn = false;
     this.adminLoggedIn = false;
     this.router.navigate(['/auth']);
  }
}

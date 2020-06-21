import { Component, OnInit } from '@angular/core';
import { StavkeKorpePremaProdavcu } from 'src/app/dtos/StavkeKorpePremaProdavcu.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { KorpaDto } from 'src/app/dtos/korpaDto.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  idKorpeUlogovanog: number;
  elementDeleted: boolean = false;
  userLoggedIn: boolean = false;
  korpa: KorpaDto;
  dataLoading = false;
  error: boolean = false;
  errorMessage: string = '';

  cartItems: StavkeKorpePremaProdavcu[] = [];
  troskoviDostave = 0;
  ukupnaVrednostArtikala = 0;
  selektovaniProdavci: {id: number}[] = [];
  ukupnoArtikala = 0;
  constructor(private api: ApiServiceService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.dataLoading = true;
    this.idKorpeUlogovanog = this.auth.vratiIdKorpeUlogovanog();
    this.api.ucitajKorpu(this.idKorpeUlogovanog).subscribe(
      response =>
      {
        setTimeout(() => this.dataLoading = false, 1000);
        console.log(response['object'])
        this.korpa = response['object'];
        console.log(this.korpa);

      }
    );
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,' + picByte;
  }
  onSelectDostava(prodavac) {
    var kurirska = true;
    for (var p of prodavac.artikli) {
      console.log(p);
    }
  }

  deleteItem(p, a, stavkaId) {
    console.log('brisanje stavke');
    console.log(stavkaId);
    var korpaId = this.auth.vratiIdKorpeUlogovanog();
    this.api.obrisiStavkuKopre(korpaId, stavkaId). subscribe(
      response => {
        this.korpa = response['object'];
        // this.ukupnaVrednostArtikala = this.korpa.ukupnaVrednost;
        if (this.selektovaniProdavci.includes(p.prodavac.id)) {
          this.ukupnoArtikala -= 1;
          this.ukupnaVrednostArtikala -= a.cena;
        }
      }
    );
  }

  selectKurirskaDostava(p){
    p.izabranaDostava = 'kurirski';
    var btnId1 = p.prodavac.id + '-kurirska';
    var kurirBtn = document.getElementById(btnId1);
    kurirBtn.classList.add('selected-btn');
    if(direktnoBtn)
      direktnoBtn.classList.remove('selected-btn');
    var btnId2 = p.prodavac.id + '-direktna';
    var direktnoBtn = document.getElementById(btnId2);
    if(direktnoBtn)
      direktnoBtn.classList.remove('selected-btn');


    var exist = this.selektovaniProdavci.includes(p.prodavac.id);

    if(exist) {
      this.troskoviDostave += 300;

    }else {
      this.ukupnoArtikala += p.artikli.length;
      this.selektovaniProdavci.push(p.prodavac.id);
      console.log(this.selektovaniProdavci)
      this.ukupnaVrednostArtikala += this.izracunajSumuArtikala(p.artikli);
    }
  }

  izracunajSumuArtikala(artikli) {
    var suma = 0;
    for (var pom of artikli) {
      console.log(pom)
      suma += pom.kolicina * pom.artikal.cena;
    }
    console.log(suma);
    return suma;
  }
  selectDirektnaDostava(p) {
    p.izabranaDostava = 'direktno';
    var btnId1 = p.prodavac.id + '-kurirska';
    var kurirBtn = document.getElementById(btnId1);
    if(kurirBtn)
      kurirBtn.classList.remove('selected-btn');
    var btnId2 = p.prodavac.id + '-direktna';
    var direktnoBtn = document.getElementById(btnId2);
    direktnoBtn.classList.add('selected-btn');


    var exist = this.selektovaniProdavci.includes(p.prodavac.id);

    if (exist) {

    }else {
      this.ukupnoArtikala += p.artikli.length;
      this.selektovaniProdavci.push(p.prodavac.id);
      console.log(this.selektovaniProdavci);
      this.ukupnaVrednostArtikala += this.izracunajSumuArtikala(p.artikli);
    }
  }
  order() {
    if(this.selektovaniProdavci.length !== this.korpa.stavke.length) {
      alert('Molimo vas da selektujete nacin dostave za sve prodavce kako biste mogli da napravite narudzbinu.');
      for(var prod of this.korpa.stavke) {
        var id = prod.prodavac.id;
        if (!this.selektovaniProdavci.includes(id)) {
          var div = document.getElementById(`prodavac-${id}`);
          div.style.border = '1.5px solid blue';
        }
      }
    }else {
      console.log('jesu')
      this.auth.setKorpa(this.korpa);
      this.router.navigate(['/order']);
    }
  }
}

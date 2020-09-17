import { Component, OnInit, ElementRef } from '@angular/core';
import { StavkeKorpePremaProdavcu } from 'src/app/dtos/StavkeKorpePremaProdavcu.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { KorpaDto } from 'src/app/dtos/korpaDto.model';
import { Router } from '@angular/router';
import { PromenaKolicineDto } from 'src/app/dtos/promenaKolicine.model';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';
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
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {


    this.idKorpeUlogovanog = this.auth.getAuthenticatedUserId();

    console.log('Ulogovan id:'+this.idKorpeUlogovanog)
    if(this.idKorpeUlogovanog) {
      this.dataLoading = true;
      this.api.ucitajKorpu(this.idKorpeUlogovanog).subscribe(
        response =>
        {
          setTimeout(() => this.dataLoading = false, 1000);
          console.log(response['object'])
          this.korpa = response['object'];
          this.auth.updateItemsNumber(this.korpa.brojStavki);
          console.log(this.korpa);

        }
      );
    }

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
    var korpaId = this.auth.getAuthenticatedUserId();
    this.api.obrisiStavkuKopre(korpaId, stavkaId). subscribe(
      response => {
        this.korpa = response['object'];
        this.auth.updateItemsNumber(this.auth.getItemsNumber()-1);
        // this.ukupnaVrednostArtikala = this.korpa.ukupnaVrednost;
        if (this.selektovaniProdavci.includes(p.prodavac.id)) {
          this.ukupnoArtikala -= 1;
          console.log('Hocemo da obrisemo artikal sa cenom '+a.cena + ' a ceo artikal je objekat')
          console.log(a)
          this.ukupnaVrednostArtikala -= a.vrednost;
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

      this.auth.setCart(this.korpa);
      this.router.navigate(['/order']);
    }
  }

  addItems(artikal: any) {
    artikal.kolicina += 1;
  }
  removeItems(artikal: any) {
    if(artikal.kolicina === 1) return;
    artikal.kolicina -= 1;
  }


  promeniKolicinu (a, staraKolicina:number, novaKolicina:number, kol: HTMLInputElement) {
    console.log(a.stavkaId, a.artikal.id, staraKolicina, novaKolicina);
    var promenaKolicineObjekat = new PromenaKolicineDto(a.stavkaId, a.artikal.id, staraKolicina, novaKolicina);
    if(staraKolicina !== novaKolicina && novaKolicina > 0) {
      this.api.promeniKolicinu(promenaKolicineObjekat).subscribe(response => {
        console.log(response);

        var status = response.status;
        var poruka = response.poruka;
        if(status === 'USPESNO'){
          console.log('usao u if naredbu')
          this.korpa = response.object;
          console.log('nova korpa setovana')
        }

        else kol.value = staraKolicina+'';
        let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
        dialogRef.afterClosed().subscribe(
          resp => {}
        );
      })
    }

    // this.api.updateKolicinu()
  }
}

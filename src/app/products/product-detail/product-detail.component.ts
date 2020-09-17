import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Artikal } from 'src/app/classes/artikal.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NovaStavkaKorpeDto } from 'src/app/dtos/novaStavkaKorpeDto.model';
import { ArtikalDetailDto } from 'src/app/dtos/artikalDetailDto.model';
import { AuthService, ITEMS_NUMBER } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { KomentarDto } from 'src/app/dtos/komentarDto.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  btnAktiviranjeText: string = 'AKTIVIRAJ'
  product: ArtikalDetailDto;
  comments: any = [];
  similarProducts: any = [];

  productId: number;
  kolicina: number = 1;
  artikalDodatUKopru: boolean;
  btnText = 'Dodaj u korpu';
  btnAddDisabled: boolean = false;
  userLoggedIn: boolean;
  prodavacVlasnikLoggedIn: boolean;
  btnIstaknutText: string;

  constructor(private apiService: ApiServiceService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {

    this.productId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    if(this.auth.getAuthenticatedUser()) {
      this.userLoggedIn = true;
      if(this.auth.selectedArticlesIds.includes(this.productId)) {
        this.btnAddDisabled = true;
        this.btnText = 'DODATO U KORPU';
      }
    }

    this.apiService.vratiArtikalPoID(this.productId).subscribe(
      response => {
        this.product = response;
        //this.similarProducts = response[]
        if(this.product.istaknut === true) {
          this.btnIstaknutText = 'Artikal je istaknut';
        }else {
          this.btnIstaknutText = 'Istakni artikal';
        }
        if (this.auth.getAuthenticatedUser() === this.product.prodavac.email) {
          this.prodavacVlasnikLoggedIn = true;
        }
        if (this.product.aktivan === true) {
          this.btnAktiviranjeText = 'DEAKTIVIRAJ';
        }
        else {
          this.btnAktiviranjeText = 'AKTIVIRAJ';
        }
      }
    );
  }

  addToCart() {
    console.log('dodajem u korpu')
    var novaStavka = new NovaStavkaKorpeDto(this.product.id, this.auth.getAuthenticatedUserId(), this.kolicina);
    this.apiService.dodajStavkuUKorpu(novaStavka).subscribe(
      response => {
        var newItemsNumber = this.auth.getItemsNumber() + 1;
        console.log('Novi broj artikala u korpi: '+newItemsNumber);
        this.auth.updateItemsNumber(newItemsNumber);
        console.log(response);
        this.auth.setCart(response['object']);
        console.log(response);
            var status = response['status'];
            var poruka = response['poruka'];
            let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
            dialogRef.afterClosed().subscribe(
              resp => {
                  this.artikalDodatUKopru = true;
                  this.btnText = 'Dodato u korpu';
              }
            );
      }
    )
  }
  povecajKolicinu() {
    if (this.kolicina < this.product.zaliha) {
      this.kolicina += 1;
    }
  }
  smanjiKolicinu() {
    if (this.kolicina > 1) {
      this.kolicina -= 1;
    }

  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,'+picByte;
  }

  ucitajKomentare() {
    if (this.product.brojKomentara > 0 && this.comments.length === 0) {
      this.apiService.ucitajKomentareArtikla(this.product.id).subscribe(
        response => {
          this.comments = response['object'];
          //this.product.brojKomentara += 1;
        }
      );
    }

  }

  sacuvajKomentar(formData) {
    var komentar = formData.value.komentar;
    console.log('Komentar: '+komentar);
    var noviKomentarObj = new KomentarDto(komentar, new Date(), this.auth.getAuthenticatedUser());

    this.apiService.sacuvajKomentar(this.product.id, noviKomentarObj).subscribe(
      response => {
        if(response['status'] === 'USPESNO') {
          this.comments.push(response['object']);
          this.product.brojKomentara += 1;
          formData.reset();
        }
      }
    )

  }

  changeActivationStatus() {
    if(this.product.aktivan === true) {
      this.apiService.deaktivirajArtikal(this.product).subscribe(
        response => {
          if (response['status'] === 'USPESNO') {
            var status = response['status'];
            var poruka = response['poruka'];
            let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
            dialogRef.afterClosed().subscribe(
              resp => {
                  this.btnAktiviranjeText = 'AKTIVIRAJ';
                  this.product.aktivan = false;
              }
            );
          }
        }
      )
    }else {
      this.apiService.aktivirajArtikal(this.product).subscribe(
        response => {
          if (response['status'] === 'USPESNO') {
            var status = response['status'];
            var poruka = response['poruka'];
            let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
            dialogRef.afterClosed().subscribe(
              resp => {
                  this.btnAktiviranjeText = 'DEAKTIVIRAJ';
                  this.product.aktivan = true;
              }
            );
          }
        }
      )
    }
  }
  setPromoted() {
    this.apiService.istakniArtikal(this.product).subscribe(
      response => {
        if (response['status'] === 'USPESNO') {
          var status = response['status'];
          var poruka = response['poruka'];
          let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
          dialogRef.afterClosed().subscribe(
            resp => {
              this.product.istaknut = true;
              this.btnIstaknutText = 'Artikal je medju istaknutim';
            }
          );
        }
      }
    )
  }

}

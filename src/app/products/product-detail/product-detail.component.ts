import { Component, OnInit } from '@angular/core';
import { Artikal } from 'src/app/classes/artikal.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NovaStavkaKorpeDto } from 'src/app/dtos/novaStavkaKorpeDto.model';
import { ArtikalDetailDto } from 'src/app/dtos/artikalDetailDto.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: ArtikalDetailDto;
  productId: number;
  kolicina: number = 1;
  artikalDodatUKopru: boolean;
  btnText = 'Dodaj u korpu';
  constructor(private apiService: ApiServiceService, private auth: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    this.apiService.vratiArtikalPoID(this.productId).subscribe(
      response => {
        this.product = response;
      }
    );
  }
  dodajUKorpu() {
    var novaStavka = new NovaStavkaKorpeDto(this.product.id, this.auth.vratiIdKorpeUlogovanog(), this.kolicina);
    this.apiService.dodajStavkuUKorpu(novaStavka).subscribe(
      response => {
        console.log(response);
        this.auth.setKorpa(response['object']);
        console.log(response);
            var status = response['status'];
            var poruka = response['poruka'];
            let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
            dialogRef.afterClosed().subscribe(
              resp => {
                if (status === 'USPESNO') {
                  this.artikalDodatUKopru = true;
                  this.btnText = 'Dodato u korpu';
                }
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
}

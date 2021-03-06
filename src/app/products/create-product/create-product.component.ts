import { Component, OnInit } from '@angular/core';
import { Pakovanje } from 'src/app/classes/pakovanje.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Kategorija } from 'src/app/classes/kategorija.model';
import { Artikal } from 'src/app/classes/artikal.model';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';
import { Prodavac } from 'src/app/classes/prodavac.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  pakovanja: Pakovanje[] = [];
  selectedCategory: Kategorija;
  selectedFile: File;
  kategorije:any = [];
  constructor(private apiService: ApiServiceService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.apiService.ucitajKategorije().subscribe(
      response => {
        this.kategorije = response;
      }
    )
  }
  sacuvajProizvod(formData) {
    var naziv = formData.value.naziv;
    var opis = formData.value.opis;
    var cena = formData.value.cena;
    var zaliha = formData.value.zaliha;
    var poreklo = formData.value.poreklo;
    var daLiMozeKurirom = formData.value.daLiMozeKurirom;
    if (daLiMozeKurirom !== true) {
      daLiMozeKurirom = false;
    }
    var kolicina = formData.value.kolicina;
    console.log('ID ulogovanog prodavca: '+this.auth.getAuthenticatedUserId())
    var prodavac = new Prodavac(null, null,this.auth.getAuthenticatedUser(),null,null,null,null,null,null, null);
    var artikal = new Artikal(-1, naziv, opis, cena, poreklo, kolicina, this.selectedCategory, daLiMozeKurirom, prodavac , +zaliha);


    this.apiService.dodajArtikal(artikal).subscribe(
      response => {
        if (response['id'] !== -1) {
          var idArt = response['id'];
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.selectedFile, naziv);
          console.log(this.selectedFile.name);

          this.apiService.sacuvajSlikuArtikla(idArt, uploadImageData).subscribe(response => {

            console.log(response);
            var status = response['status'];
            var poruka = response['poruka'];
            let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
            dialogRef.afterClosed().subscribe(
              resp => {
                if (status === 'USPESNO') {
                  this.router.navigate(['/products/details']);
                }
              }
            );
          });
        } else {
          console.log('neki problem')
        }

      }
    )

  }
  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

}

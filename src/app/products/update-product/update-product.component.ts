import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Artikal } from 'src/app/classes/artikal.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { ArtikalDetailDto } from 'src/app/dtos/artikalDetailDto.model';
import { Kategorija } from 'src/app/classes/kategorija.model';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: ArtikalDetailDto;
  productId: number;
  updateFormGroup: FormGroup;
  kategorije: any;
  isKurirskomChecked: boolean;
  selektovanaKategorija: Kategorija;
  constructor(private _formBuilder: FormBuilder, private api: ApiServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    if(this.productId) {
      this.api.vratiArtikalPoID(this.productId).subscribe (
        response => {
          this.product = response;
          this.isKurirskomChecked = this.product.slanjeKuriromMoguce;
          this.selektovanaKategorija = this.product.kategorija;
          console.log('Da li moze kurirom')
          console.log(this.product.slanjeKuriromMoguce)
          console.log(this.isKurirskomChecked)
          this.updateFormGroup = this._formBuilder.group({
            naziv: [this.product.naziv, ],
            opis: [this.product.opis, ],
            cena: [this.product.cena, ],
            zaliha: [this.product.zaliha, ],
            poreklo: [this.product.poreklo, ],
            kolicina: [this.product.kolicina, ],
          });
        }

      )
    }
    this.api.ucitajKategorije().subscribe(
      response => {
        this.kategorije = response;
      }
    )
    this.updateFormGroup = this._formBuilder.group({
      naziv: ['', [Validators.minLength(4)]],
      opis: ['', ],
      cena: ['', ],
      zaliha: ['', ],
      poreklo: ['', ],
      kolicina: ['', ],
    });
  }
  promeniMogucnostSlanjaArtiklaKurirom() {
    this.product.slanjeKuriromMoguce = !this.product.slanjeKuriromMoguce;
  }
  sacuvajArtikal() {
    if(this.updateFormGroup.value.naziv !== '') {
      this.product.naziv = this.updateFormGroup.value.naziv;
    }
    if(this.updateFormGroup.value.opis !== '') {
      this.product.opis = this.updateFormGroup.value.opis;
    }
    if(this.updateFormGroup.value.cena !== '') {
      this.product.cena = this.updateFormGroup.value.cena;
    }
    if(this.updateFormGroup.value.zaliha !== '') {
      this.product.zaliha = this.updateFormGroup.value.zaliha;
    }
    if(this.updateFormGroup.value.poreklo !== '') {
      this.product.poreklo = this.updateFormGroup.value.poreklo;
    }
    if(this.updateFormGroup.value.kolicina !== '') {
      this.product.kolicina = this.updateFormGroup.value.kolicina;
    }
    if(this.selektovanaKategorija.naziv !== this.product.kategorija.naziv) {
      this.product.kategorija = this.selektovanaKategorija;
    }
    console.log(this.product);
    this.api.izmeniArtikal(this.product).subscribe (
      response => {
        console.log('uspesno')
        console.log(response)
      }
    );
  }
  changeSelection(kategorija) {
    this.selektovanaKategorija = kategorija;

  }
}

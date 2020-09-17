import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtikalOsnovnoDto } from '../dtos/artikalOsnovnoDto.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileId: number;
  profile: any;
  products: ArtikalOsnovnoDto[] = [];
  slikaPath: any;
  constructor(private api: ApiServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    this.api.vratiProfilPremaId(this.profileId).subscribe(
      response => {
        this.profile = response['object'];

        this.slikaPath = response['object']['slika']['picByte'];
        console.log('slika path'+this.slikaPath)
      }
    )

  }
  ucitajProizvode(){
    this.api.ucitajArtiklePremaProdavacId(this.profileId).subscribe (
      response => {
        this.products = response['object'];
        console.log(this.products);
        var productsDiv = document.getElementById('productsDiv')
        productsDiv.scrollTop = productsDiv.scrollHeight;

      }
    )
  }
  prikaziDetalje(productId: number) {
    this.router.navigate([`/products/detail/${productId}`]);
  }
  formProfileImg() {

    return 'data:image/jpeg;base64,'+this.slikaPath;
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,'+picByte;
    //return 'data:image/jpeg;base64,'+this.slikaPath;
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileId: number;
  profile: any;
  products: any;
  constructor(private api: ApiServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;
    this.api.vratiProfilPremaId(this.profileId).subscribe(
      response => {
        this.profile = response['object'];
      }
    )
  }
  ucitajProizvode(){
    this.api.ucitajArtiklePremaProdavacId(this.profileId).subscribe (
      response => {
        this.products = response['object'];
      }
    )
  }
  prikaziDetalje(productId: number) {
    this.router.navigate([`/products/detail/${productId}`]);
  }
}

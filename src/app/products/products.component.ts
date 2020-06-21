import { Component, OnInit } from '@angular/core';
import { ArtikalOsnovnoDto } from '../dtos/artikalOsnovnoDto.model';
import { ApiServiceService } from '../services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ArtikalOsnovnoDto[] = [];
  kategorijaId: number;
  constructor(private apiService: ApiServiceService,
    private router: Router) {
  }

  ngOnInit() {
    this.apiService.vratiSveArtikle().subscribe(
      response => {
        this.products = response;
      }
    )

  }
  prikaziDetalje(artikalId: number) {
    this.router.navigate([`/products/detail/${artikalId}`]);
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,' + picByte;
  }
}

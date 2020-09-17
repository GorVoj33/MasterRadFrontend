import { Component, OnInit } from '@angular/core';
import { ArtikalOsnovnoDto } from '../dtos/artikalOsnovnoDto.model';
import { ApiServiceService } from '../services/api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Options, LabelType } from '@m0t0r/ngx-slider';
import { Kategorija } from '../classes/kategorija.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: ArtikalOsnovnoDto[] = [];
  productsCopy = [];
  kategorijaId: number;
  dataLoading: boolean;
  ascName: boolean = true;
  descName: boolean;
  filterProduct: string;
  ascPrice: boolean = true;
  descPrice: boolean = false;
  categoryid: number;
  kategorije: Kategorija[] = [];
  minValue: number = 0;
  maxValue: number = 10000;
  selektovanaKategorija: Kategorija;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min cena:</b> ' + value + ' din.';
        case LabelType.High:
          return '<b>Max cena:</b> ' + value + ' din.';
        default:
          return value + ' din.';
      }
    }
  };

  constructor(private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.url.subscribe(url => {
        var katId = url[1];
        this.categoryid = katId ? parseInt(katId.toString()) : null;
        if (this.categoryid !== null) {
          console.log('Filter po kategoriji '+ this.categoryid)
          this.products = this.productsCopy.filter(product => product.kategorija.id === this.categoryid);
        }
      })
      console.log('PONOVNO KREIRANJE')
      this.dataLoading = true;
    this.categoryid = this.route.snapshot.paramMap.get('id') ? parseInt(this.route.snapshot.paramMap.get('id')) : null;


    this.apiService.vratiSveArtikle().subscribe(
      response => {
        setTimeout(() => this.dataLoading = false, 300);

        this.products = response;
        this.productsCopy = [...this.products];
        if (this.categoryid !== null) {
          console.log('Filter po kategoriji '+ this.categoryid)
          this.products = this.products.filter(product => product.kategorija.id === this.categoryid);
        }
        this.sortByPriceAsc();
      }
    );
  }

  ngOnInit() {


    if(this.apiService.getKategorije().length === 0) {
      this.apiService.ucitajSveKategorije().subscribe(
        kategorije => {
          this.kategorije = [...kategorije];
          var sum = this.calculateSum();
          var fakeKategorija = new Kategorija (-1, 'Prikaži sve', null, sum);
          this.kategorije.push(fakeKategorija);
          this.selektovanaKategorija = this.kategorije[this.kategorije.length - 1];

          this.apiService.setKategorije(kategorije);
        }
      )
    }else {
      this.kategorije = [...this.apiService.getKategorije()];
      var sum = this.calculateSum();
      var fakeKategorija = new Kategorija (-1, 'Prikaži sve', null, sum);
      this.kategorije.push(fakeKategorija);
      this.selektovanaKategorija = this.kategorije[this.kategorije.length - 1];
    }

  }
  calculateSum(){
    var sum = 0;
    this.kategorije.forEach(element => {
      sum += element.brojArtikala;
    });
    return sum;
  }
  showProduct(artikalId: number) {
    this.router.navigate([`/products/detail/${artikalId}`]);
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,' + picByte;
  }

  sortByNameAsc() {
    this.dataLoading = true;
    setTimeout(() => this.dataLoading = false, 300);
    this.descName = true;
    this.ascName = false;
    this.products.sort((a, b) => (a.naziv < b.naziv ? -1 : 1));
  }
  sortByNameDesc() {
    this.dataLoading = true;
    setTimeout(() => this.dataLoading = false, 300);
    this.descName = false;
    this.ascName = true;
    this.products.sort((a, b) => (a.naziv > b.naziv ? -1 : 1));
  }

  sortByPriceAsc() {
    this.dataLoading = true;
    setTimeout(() => this.dataLoading = false, 300);
    this.descPrice = true;
    this.ascPrice = false;
    this.products.sort((a, b) => (a.cena < b.cena ? -1 : 1));
  }
  sortByPriceDesc() {
    this.dataLoading = true;
    setTimeout(() => this.dataLoading = false, 300);
    this.descPrice = false;
    this.ascPrice = true;
    this.products.sort((a, b) => (a.cena > b.cena ? -1 : 1));
  }

  prikaziFilter() {
    if(this.filterProduct === '') {
      this.products = this.productsCopy;
    }
    this.products = this.productsCopy.filter(product => product.naziv.toLowerCase().includes(this.filterProduct.toLowerCase()));
  }
  promeniFilterCena() {
    console.log('promenjen filter')
    console.log(this.minValue)
    console.log(this.maxValue)
    if(this.maxValue === 10000) {
      this.products = this.productsCopy.filter(product => product.cena > this.minValue);
      return;
    }
    this.products = this.productsCopy.filter(product => product.cena > this.minValue && product.cena < this.maxValue);

  }

  primeniFilterKategorija (){
    if(this.selektovanaKategorija.id === -1) {
      this.products = [...this.productsCopy];
      return;
    }
    this.products = this.productsCopy.filter(product => product.kategorija.id === this.selektovanaKategorija.id)
  }
}

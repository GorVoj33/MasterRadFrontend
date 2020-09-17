import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Router } from '@angular/router';
import { Kategorija } from 'src/app/classes/kategorija.model';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  kategorije: any;
  counter: number;
  mainProducts: any;
  mainP;
  sveKategorije: Kategorija[] = [];

  constructor(private auth: AuthService, private apiService: ApiServiceService, private router: Router) { }

  ngOnInit() {
    this.counter = this.auth.getItemsNumber();
    this.apiService.ucitajIstaknuteArtikle().subscribe(
      response => {
        this.mainProducts = response;
        this.mainP = this.mainProducts[0];
      }
    );
    if(this.apiService.getKategorije().length === 0) {
      this.apiService.ucitajSveKategorije().subscribe(
        kategorije => {
          this.sveKategorije = kategorije;
          this.apiService.setKategorije(kategorije);
        }
      )
    } else {
      this.kategorije = this.apiService.getKategorije();
    }
    this.apiService.ucitajSveKategorije().subscribe (
      kategorije => {
        this.sveKategorije = kategorije;
      }
    )
    console.log('sve kategorije: ' + this.sveKategorije);
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,'+picByte;
  }

  goToDetails(id: number) {
    this.router.navigate([`/products/detail/${id}`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Grad } from '../classes/grad.model';
import { ApiServiceService } from '../services/api-service.service';
import { KorpaDto } from '../dtos/korpaDto.model';
import { AuthService } from '../services/auth.service';
import { OrderDto } from '../dtos/orderDto.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart: any;
  address: string;
  contact: string;
  isLinear: boolean;
  cities: Grad[];
  selectedCity: Grad;
  korpa: KorpaDto;
  formImg(picByte){
    return 'data:image/jpeg;base64,'+picByte;
  }
  populateAddress(firstFormGroup) {
    var adresa = firstFormGroup.value.adresa;
    var kontaktAlternativni = firstFormGroup.value.telefon;
    this.address = adresa;
    this.contact = kontaktAlternativni;
  }
  constructor(private api: ApiServiceService, private auth : AuthService) { }

  ngOnInit() {
    this.api.vratiListuGradova().subscribe(
      response => {
        this.cities = response;
      }
    );
    this.korpa = this.auth.getKorpa();
    console.log('Korpa');
    console.log(this.korpa);
  }
  izracunajSumu(stavka){
    var sum = 0;
    for (var artikal of stavka.artikli) {
      sum += artikal.artikal.cena * artikal.kolicina;
    }
    stavka.ukupnaVrednost = sum;
    return sum;
  }
  potvrdi() {
    var order = new OrderDto(-1, this.korpa.ukupnaVrednost, this.korpa, false, this.auth.userId, null, null, this.address, this.selectedCity, this.contact);
    console.log('ovo se cuva')
    console.log(order)
    this.api.sacuvajNarudzbine(order).subscribe(
      response => {
        console.log(response)
      }
    )

  }

}

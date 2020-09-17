import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { OrderDetalji } from 'src/app/dtos/orderDetalji.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {
  panelOpenState = false;


  userId: number;
  ordersFromOtherBuyers: OrderDetalji[] = [];
  myOrders: OrderDetalji[] = [];
  prodavacLoggedIn: boolean = false;
  constructor(private api: ApiServiceService,
    private auth: AuthService) { }

  ngOnInit() {
    this.userId = this.auth.getAuthenticatedUserId();
    this.api.ucitajSveNarudzbine(this.userId).subscribe(
      response => {
        this.myOrders = response;
      }
    );
    if (this.auth.getRoleOfAuthenticatedUser() === '[prodavac]') {
      this.prodavacLoggedIn = true;
      this.api.ucitajSveNarudzbineZaProdavca(this.userId).subscribe(
        response => {
          this.ordersFromOtherBuyers = response;
        }
      );
    }
  }
  odbijNarudzbinu(order) {
    this.api.odbijNarudzbinu(order).subscribe(
      response => {
        if(response['status'] === 'USPESNO') {
          alert('Narudzbina uspesno odbijena.')
        }
      }
    );
  }

  prihvatiNarudzbinu(order){
    this.api.prihvatiNarudzbinu(order).subscribe(
      response => {
        if (response['status'] === 'USPESNO') {

          alert('Narudzbina uspesno prihvacena.')
        }
      }
    );
  }
  sum(stavke) {
    var sum = 0;
    for(var stavka of stavke) {
      sum += stavka.cenaStavke;
    }
    return sum;
  }

  getColor(order) {
    // #d7f7da
    // #ed7b87
    if(order.odobrena) {
      return '#d7f7da';
    }
    else if (order.datumOdobrenja===null && order.datumOdbijanja===null){
      return '#d7d4fc';
    }
    else return '#ed7b87';
  }
}

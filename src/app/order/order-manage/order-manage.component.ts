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
  userId: number;
  orders: OrderDetalji[] = [];

  constructor(private api: ApiServiceService,
    private auth: AuthService) { }

  ngOnInit() {
    this.userId = this.auth.userId;
    this.api.ucitajSveNarudzbine(this.userId).subscribe(
      response => {
        this.orders = response;
      }
    )
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
}

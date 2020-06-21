import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  prihvaceniKupci = [];
  prihvaceniProdavci = [];
  kupciNaCekanju = null;
  prodavciNaCekanju = null;
  displayedColumns: string[] = ['Ime', 'Prezime', 'Email', 'Kontakt', 'Gazdinstvo', 'Grad', 'Ulica', 'Opis', 'Akcija'];
  displayedColumnsKupci: string[] = ['Ime', 'Prezime', 'Email', 'Razlog registracije', 'Akcija'];
  dataSourceProdavci = new MatTableDataSource(this.prihvaceniProdavci);
  dataSourceKupci = new MatTableDataSource(this.prihvaceniKupci);
  orders = [];
  odbijeneNarudzbine = null;
  prihvaceneNarudzbine = null;

  brojPrihvacenihKorisnika = 0;
  ukupanPrihod = 0;
  brojAktivnihArtikala = 0;
  brojNeaktivnihArtikala = 0;
  nazivSadrzaja: string = 'Sadrzaj';
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProdavci.filter = filterValue.trim().toLowerCase();
  }
  constructor(private api: ApiServiceService) { }

  ngOnInit() {
    if(this.prihvaceniProdavci.length === 0) {
      this.api.ucitajPrihvaceneProdavce().subscribe(
        response => {
          this.prihvaceniProdavci = response['object'];
          this.brojPrihvacenihKorisnika = this.prihvaceniProdavci.length;
          console.log(this.prihvaceniProdavci)
          this.dataSourceProdavci = new MatTableDataSource(this.prihvaceniProdavci);

        }
      );
    }
    if(this.prihvaceniKupci.length === 0) {
      this.api.ucitajPrihvaceneKupce().subscribe(
        response => {
          this.prihvaceniKupci = response['object'];
          console.log(this.prihvaceniKupci)
          this.dataSourceKupci = new MatTableDataSource(this.prihvaceniKupci);

        }
      );
    }
    this.ucitajUkupanPrihod();
    this.ucitajOsnovneInformacijeZaPanel();
  }

  odobri(idKorisnika) {
    this.api.posaljiZahtevZaOdobravanjeKorisnika(idKorisnika).subscribe(
      response => {
        console.log(response);
      }
    )
  }
  ucitajUkupanPrihod() {
    this.api.ucitajUkupanPrihod().subscribe(
      response => {
        this.ukupanPrihod = response['object'];
      }
    );
  }
  ucitajOsnovneInformacijeZaPanel() {
    this.api.ucitajOsnovneInformacije().subscribe(
      response => {
        this.brojAktivnihArtikala = response['object'].brojAktivnihArtikala;
        this.brojNeaktivnihArtikala = response['object'].brojNeaktivnihArtikala;
      }
    )
  }
  ucitajPrihvaceneProdavce(){
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'none';
    prodavciTable.style.display = 'block';
    this.dataSourceProdavci = new MatTableDataSource(this.prihvaceniProdavci);
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'none';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'none';
    this.nazivSadrzaja = "Prihvaceni prodavci";
  }
  ucitajPrihvaceneKupce(){
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'block';
    prodavciTable.style.display = 'none';
    this.dataSourceKupci = new MatTableDataSource(this.prihvaceniKupci);
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'none';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'none';
    this.nazivSadrzaja = "Prihvaceni kupci";
  }

  ucitajProdavceNaCekanju() {
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'none';
    prodavciTable.style.display = 'block';
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'none';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'none';
    if(this.prodavciNaCekanju === null) {
      this.api.ucitajNePrihvaceneProdavce().subscribe(
        response => {
          this.prodavciNaCekanju = response['object'];

        }

      );
    }
    this.dataSourceProdavci = new MatTableDataSource(this.prodavciNaCekanju);
    this.nazivSadrzaja = "Prodavci koji cekaju odobrenje registracije";
  }

  ucitajKupceNaCekanju() {
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'block';
    prodavciTable.style.display = 'none';
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'none';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'none';
    if(this.kupciNaCekanju === null) {
      this.api.ucitajNePrihvaceneKupce().subscribe(
        response => {
          this.kupciNaCekanju = response['object'];

        }

      )

    }
    this.dataSourceKupci = new MatTableDataSource(this.kupciNaCekanju);
    this.nazivSadrzaja = "Kupci koji cekaju odobrenje registracije";
  }
  ucitajOdbijeneNarudzbenice() {
    if (this.odbijeneNarudzbine === null) {
      this.api.ucitajOdbijeneNarudzbine().subscribe(
        response => {
          this.odbijeneNarudzbine = response['object'];
        }
      );
    }
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'none';
    prodavciTable.style.display = 'none';
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'block';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'none';
    this.orders = this.odbijeneNarudzbine;
    this.nazivSadrzaja = "Odbijene narudzbine";
  }

  ucitajPrihvaceneNarudzbenice() {
    if (this.prihvaceneNarudzbine === null) {
      this.api.ucitajPrihvaceneNarudzbine().subscribe(
        response => {
          this.prihvaceneNarudzbine = response['object'];
        }
      );
    }
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'none';
    prodavciTable.style.display = 'none';
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'block';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'none';
    this.orders = this.prihvaceneNarudzbine;
    this.nazivSadrzaja = "Prihvacene narudzbine";
  }
  prikaziFormuZaUnosKategorije() {
    var kupciTable = document.getElementById('kupci-tbl');
    var prodavciTable = document.getElementById('prodavci-tbl');
    kupciTable.style.display = 'none';
    prodavciTable.style.display = 'none';
    var ordersTable = document.getElementById('orders-tbl');
    ordersTable.style.display = 'none';
    var newCategory = document.getElementById('new-category');
    newCategory.style.display = 'block';
    this.nazivSadrzaja = 'Unos nove kategorije';
  }
}

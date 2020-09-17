import { Component, OnInit } from '@angular/core';
import { MesecnaStatistikaDto } from '../dtos/mesecnaStatistika.model';
import { NovaKategorijaDto } from '../dtos/novaKategorijaDto.model';
import { ApiServiceService } from '../services/api-service.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AuthService } from '../services/auth.service';
import {Chart} from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
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
  mesecneStatistike: MesecnaStatistikaDto[] = [];
  brojPrihvacenihKorisnika = 0;
  ukupanPrihod = 0;
  brojAktivnihArtikala = 0;
  brojNeaktivnihArtikala = 0;
  nazivSadrzaja: string = 'Sadrzaj';
  showStats: boolean=false;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProdavci.filter = filterValue.trim().toLowerCase();
  }
  constructor(private api: ApiServiceService,
              private auth: AuthService,
              private dialog: MatDialog,
              private router: Router) { }

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

    this.api.ucitajPodatkeOGradovima().subscribe(
      response => {
        console.log(response)

        var customLabels = [];
        var brojProdavaca = [];
        var brojNarudzbi = [];
        response.forEach(grad => {
          customLabels.push(grad.grad.naziv);
          brojProdavaca.push(grad.brojProdavaca);
          brojNarudzbi.push(grad.brojNarudzbina);
        });


        console.log('nazivi gradova');
        console.log(customLabels)
        var myChart = new Chart("myChart", {
          type: 'bar',
          data: {
              //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              labels: customLabels,
              datasets: [{
                  label: 'Broj prodavaca po gradovima',
                  //data: [12, 19, 3, 5, 2, 3],
                  data: brojProdavaca,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
      });


      var myChart2 = new Chart("myChart2", {
        type: 'bar',
        data: {
            //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            labels: customLabels,
            datasets: [{
                label: 'Broj narudzbi po gradovima',
                //data: [12, 19, 3, 5, 2, 3],
                data: brojNarudzbi,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

      }
    );

    if(this.mesecneStatistike.length === 0){
        this.api.ucitajMesecnuStatistiku().subscribe(
        response => {
          console.log(response);
          this.mesecneStatistike = response['object'];
          var meseci = [];
          var vrednostPrihod = [];
          var brojNarudzbina = [];
          this.mesecneStatistike.forEach(stat => {
            meseci.push(stat.mesec);
            brojNarudzbina.push(stat.brojNarudzbina);
            vrednostPrihod.push(stat.ukupniPrihod);
          });
          var myChart3 = new Chart("myChart3", {
                    type: 'bar',
                    data: {
                        //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        labels: meseci,
                        datasets: [{
                            label: 'Broj prihoda po mesecima',
                            //data: [12, 19, 3, 5, 2, 3],
                            data: vrednostPrihod,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

                var myChart4 = new Chart("myChart4", {
                          type: 'bar',
                          data: {
                              //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                              labels: meseci,
                              datasets: [{
                                  label: 'Broj broj narudzbina po mesecima',
                                  //data: [12, 19, 3, 5, 2, 3],
                                  data: brojNarudzbina,
                                  backgroundColor: [
                                      'rgba(255, 99, 132, 0.2)',
                                      'rgba(54, 162, 235, 0.2)',
                                      'rgba(255, 206, 86, 0.2)',
                                      'rgba(75, 192, 192, 0.2)',
                                      'rgba(153, 102, 255, 0.2)',
                                      'rgba(255, 159, 64, 0.2)'
                                  ],
                                  borderColor: [
                                      'rgba(255, 99, 132, 1)',
                                      'rgba(54, 162, 235, 1)',
                                      'rgba(255, 206, 86, 1)',
                                      'rgba(75, 192, 192, 1)',
                                      'rgba(153, 102, 255, 1)',
                                      'rgba(255, 159, 64, 1)'
                                  ],
                                  borderWidth: 1
                              }]
                          },
                          options: {
                              scales: {
                                  yAxes: [{
                                      ticks: {
                                          beginAtZero: true
                                      }
                                  }]
                              }
                          }
                      });

        }
        )
    }


  }

  odobri(idKorisnika) {
    this.api.posaljiZahtevZaOdobravanjeKorisnika(idKorisnika).subscribe(
      response => {
        if(response['status'] === 'USPESNO') {
          let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: response['status'], message: 'Korisnik je uspesno odobren.'}});
            dialogRef.afterClosed().subscribe(
              resp => {
                this.ucitajKupceNaCekanju();
                this.ucitajProdavceNaCekanju();
              }
            );
        }
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
    console.log('ucitavam prihvacene')
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
    newCategory.scrollIntoView();
  }

  prikaziMesecnePrihode () {

    this.showStats = !this.showStats;
  }
  async logout () {
    await this.auth.logout();
    this.router.navigate(['/auth']);
  }
}

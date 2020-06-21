import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Grad } from 'src/app/classes/grad.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  profiles: any;
  gradovi: Grad[] = [];
  selektovaniGrad: Grad;
  filterIme: string = '';
  noResults: boolean = false;
  kopijaNizaSvihProfila = this.profiles;
  constructor(private api: ApiServiceService) { }

  ngOnInit() {

    this.api.ucitajSveProfile().subscribe (
      response => {
        console.log(response['object'])
        this.profiles = response['object'];
        this.kopijaNizaSvihProfila = response['object'];
      }
    );
    this.api.vratiListuGradova().subscribe (
      response => {
        var noviGrad = new Grad(-1, 'Prikazi sve');

        this.gradovi = response;
        this.gradovi.push(noviGrad);
      }
    )
  }
  prikaziFilter() {

    var noviNiz = [];

    for(var prof of this.kopijaNizaSvihProfila) {
      var ime = prof.ime;
      var prezime = prof.prezime;
      if(ime.toLowerCase().includes(this.filterIme.toLowerCase()) || prezime.toLowerCase().includes(this.filterIme.toLowerCase())) {
        noviNiz.push(prof);
      }

    }
    if(noviNiz.length > 0) {
      this.profiles = noviNiz;
      this.noResults = false;
    }else {
      this.noResults = true;
      this.profiles = this.kopijaNizaSvihProfila;
    }
  }
  primeniFilterGrad() {
    console.log('selektovani grad je ')

    console.log(this.selektovaniGrad.ptt)
    if (this.selektovaniGrad.ptt === -1) {
      this.profiles = this.kopijaNizaSvihProfila;
      return;
    }
    var noviNiz = [];
    for(var prof of this.kopijaNizaSvihProfila) {
      var grad = prof.grad.naziv;
      if(grad === this.selektovaniGrad.naziv) {
        noviNiz.push(prof);
      }

    }
    if(noviNiz.length > 0) {
      this.profiles = noviNiz;
      this.noResults = false;
    }else {
      this.noResults = true;
      this.profiles = this.kopijaNizaSvihProfila;
    }
  }
}

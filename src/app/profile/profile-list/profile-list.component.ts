import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Grad } from 'src/app/classes/grad.model';
import { Router } from '@angular/router';

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
  dataLoading: boolean;
  constructor(private api: ApiServiceService,
    private router: Router) { }

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
        this.gradovi.sort((a, b) => (a.naziv < b.naziv ? -1 : 1));
        this.gradovi.push(noviGrad);
      }
    )
  }
  prikaziFilter() {
    this.dataLoading = true;
    setTimeout(() => this.dataLoading = false, 300);
    this.profiles = this.kopijaNizaSvihProfila.filter(element => {
      return element.ime.toLowerCase().includes(this.filterIme.toLowerCase()) || element.prezime.toLowerCase().includes(this.filterIme.toLowerCase());
    })
    // var noviNiz = [];
    //   if(this.profiles.length === 0) {
    //     this.profiles = this.kopijaNizaSvihProfila;
    //   }
    //   for(var prof of this.profiles) {
    //     var ime = prof.ime;
    //     var prezime = prof.prezime;
    //     var opis = prof.opis;
    //       if(ime.toLowerCase().includes(this.filterIme.toLowerCase()) || prezime.toLowerCase().includes(this.filterIme.toLowerCase())
    //       || prof.opis.toLowerCase().includes(this.filterIme.toLowerCase())) {
    //         noviNiz.push(prof);
    //       }
    //   }
    // if(noviNiz.length > 0) {
    //   this.profiles = noviNiz;
    //   this.noResults = false;
    // }else {
    //   this.noResults = true;
    //   this.profiles = this.kopijaNizaSvihProfila;
    // }
  }
  primeniFilterGrad() {
    this.dataLoading = true;

    setTimeout(() => this.dataLoading = false, 300);
    if(this.selektovaniGrad.ptt === -1) {
      this.profiles = this.kopijaNizaSvihProfila;
      return;
    }
    this.profiles = this.kopijaNizaSvihProfila.filter(element => {

      return element.grad.ptt === this.selektovaniGrad.ptt;
    })


  }

  goToProfile(profile) {
    this.router.navigate([`/profile/${profile.id}`])
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,'+picByte;
  }
}

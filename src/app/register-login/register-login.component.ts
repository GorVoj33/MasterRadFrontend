import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NgForm } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { LoginAttemptDto } from '../dtos/loginAttemptDto.model';
import { RegistracijaProdavcaDto } from '../dtos/registracijaProdavcaDto.model';
import { Prodavac } from '../classes/prodavac.model';
import { RegistracijaKupcaDto } from '../dtos/registracijaKupcaDto.model';
import { Grad } from '../classes/grad.model';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  form1: HTMLElement;
  form2: HTMLElement;
  form3: HTMLElement;
  btn1: HTMLElement;
  btn2: HTMLElement;
  btn3: HTMLElement;
  registerKupacEnabled: boolean = false;
  registerProdavacEnabled: boolean = false;
  box: any = document.getElementById('form-box');
  gradovi: Grad[] = [];
  selectedCity: Grad;
  // gradovi: Grad[] = [
  //   {id: '11000', naziv: 'Beograd'},
  //   {id: '21000', naziv: 'Novi Sad'},
  //   {id: '3000', naziv: 'Cacak'}
  // ];

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
    this.form1 = document.getElementById('f1');
    this.form2 = document.getElementById('f2');
    this.form3 = document.getElementById('f3');
    this.btn1 = document.getElementById('btn1');
    this.btn2 = document.getElementById('btn2');
    this.btn3 = document.getElementById('btn3');
    this.apiService.vratiListuGradova().subscribe(
      response => {

        console.log(response)
        this.gradovi = response;
        // for(var key in response) {
        //   console.log('Objekat:')
        //   var obj = response[key];
        //   var grad=new Grad(obj['ptt'], obj['naziv']);
        //   this.gradovi.push(grad);
        //   console.log(grad);
        // }
      }
    );
    this.selectedCity = this.gradovi[0];
  }
  prikaziStranuZaRegistracijuKupca() {
    this.btn1.classList.remove('active');
    this.btn3.classList.remove('active');
    this.btn2.classList.add('active');
    this.form1.style.display = 'none';
    this.form2.style.display = 'block';
    this.form3.style.display = 'none';
  }
  prikaziStranuZaRegistracijuProdavca(){
    this.btn1.classList.remove('active');
    this.btn3.classList.add('active');
    this.btn2.classList.remove('active');
    this.form1.style.display = 'none';
    this.form2.style.display = 'none';
    this.form3.style.display = 'block';
  }
  prikaziStranuZaPrijavu() {
    this.btn1.classList.add('active');
    this.btn3.classList.remove('active');
    this.btn2.classList.remove('active');
    this.form1.style.display = 'block';
    this.form2.style.display = 'none';
    this.form3.style.display = 'none';
  }
  onSelectionChangeProdavacForm(grad: Grad) {
    document.getElementById('prodavac-grad').style.display = 'block';
    this.selectedCity = grad;
  }
  onSelectGazdinstvo() {
    var x = document.getElementById('naziv-gazdinstva-id').style.display;
    if (x === 'none') {
      document.getElementById('naziv-gazdinstva-id').style.display = 'block';
    } else {
      document.getElementById('naziv-gazdinstva-id').style.display = 'none';
      document.getElementById('naziv-gazdinstva-id').setAttribute('value', '');
    }
  }

  onSelectKupacConditionsAccepted() {
    this.registerKupacEnabled = !this.registerKupacEnabled;
  }
  onSelectProdavacConditionsAccepted(){
    this.registerProdavacEnabled = !this.registerProdavacEnabled;
  }
  // registerProdavac() {
  //   if (!this.registerEnabled) {
  //     alert('Morate prihvatiti uslove korišćenja kako bi se registrovali.');
  //   }
  //   console.log('register prodavac');
  // }

  login(formData: NgForm) {
    var email = formData.value.useremail;
    var password = formData.value.userpassword;
    var lad = new LoginAttemptDto(email, password);
    console.log(lad)
    this.apiService.login(lad).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log('error');
      console.log(error.message);
    });
  }

  registrujNovogProdavca(formData: NgForm) {

    var nazivGazdinstva = formData.value.nazivGazdinstva;
    var imeprodavca = formData.value.imeprodavca;
    var prezimeprodavca = formData.value.prezimeprodavca;
    var emailprodavca = formData.value.emailprodavca;
    var lozinkaprodavca = formData.value.lozinkaprodavca;
    var kontaktprodavca = formData.value.kontaktprodavca;
    var minIznos = +formData.value.minIznos;
    var ulicaprodavca = formData.value.ulicaprodavca;
    var opis = formData.value.opis;
    var dd = formData.value.direktnaDostava;
    if (dd !== true) {
      dd = false;
    }
    if (kd !== true) {
      kd = false;
    }
    var kd = formData.value.kurirskaDostava;
    console.log('parametri')
    console.log (imeprodavca, dd, kd);
    var noviProdavac = new RegistracijaProdavcaDto( imeprodavca, prezimeprodavca,
       emailprodavca, lozinkaprodavca, kontaktprodavca, minIznos, ulicaprodavca,
       opis, dd, kd, this.selectedCity, nazivGazdinstva);
    console.log(noviProdavac);
    // if (nazivGazdinstva !== '') {
    //   noviProdavac = new RegistracijaProdavcaDto(imeprodavca, prezimeprodavca, emailprodavca, kontaktprodavca, minIznos,
    //     ulicaprodavca, opis, dd, kd, this.selectedCity, nazivGazdinstva);
    //   console.log(noviProdavac);
    // } else {
    //   console.log('nema gazd')
    //   noviProdavac = new RegistracijaProdavcaDto(imeprodavca, prezimeprodavca, emailprodavca, kontaktprodavca, minIznos,
    //     ulicaprodavca, opis, dd, kd, this.selectedCity);
    //   console.log(noviProdavac);
    // }
    this.apiService.registrujProdavca(noviProdavac).subscribe(
      response => {
        console.log('odgovor prihvacen');
      },
      error => {
        console.log('greska');
      }
    );


  }

  registrujNovogKupca(formData: NgForm){
    var ime = formData.value.imekupca;
    var prezime = formData.value.prezimekupca;
    var email = formData.value.emailkupca;
    var pass = formData.value.passwordkupca;

    console.log(ime, prezime, email, pass);
    console.log('registracija kupca');
    var noviKupac = new RegistracijaKupcaDto(ime, prezime, email, pass);
    console.log(noviKupac);
    this.apiService.registrujKupca(noviKupac).subscribe(
      response => {
        console.log('odgovor prihvacen');
        console.log(response);
      },
      error => {
        console.log('greska');
      }
    );
  }
}

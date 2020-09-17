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
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {
  dataLoading: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
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
  name: string = '';
  selectedFile: any;
  registerSuccessful: boolean = false;
  passwordReenteredErrorK: boolean = false;
  passwordReenteredErrorP: boolean = false;
  imgProdavacDodat: boolean = false;
  showFileErrorProdavac: boolean = false;
  constructor(private apiService: ApiServiceService,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.form1 = document.getElementById('f1');
    this.form2 = document.getElementById('f2');
    this.form3 = document.getElementById('f3');
    this.btn1 = document.getElementById('btn1');
    this.btn2 = document.getElementById('btn2');
    this.btn3 = document.getElementById('btn3');
    this.apiService.vratiListuGradova().subscribe(
      response => {
        this.gradovi = response;
        this.gradovi.sort((a, b) => (a.naziv < b.naziv ? -1 : 1));
      }
    );
    this.selectedCity = this.gradovi[0];
  }
  prikaziStranuZaRegistracijuKupca() {
    this.error= false;
    this.btn1.classList.remove('active');
    this.btn3.classList.remove('active');
    this.btn2.classList.add('active');
    this.form1.style.display = 'none';
    this.form2.style.display = 'block';
    this.form3.style.display = 'none';
  }
  prikaziStranuZaRegistracijuProdavca(){
    this.error = false;
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

  login(formData: NgForm) {

      this.dataLoading = true;
      this.error = false;
      var email = formData.value.useremail;
      var password = formData.value.userpassword;
      if(!formData.valid) {
        this.error = true;
        this.dataLoading = false;
        this.errorMessage = 'Unesite parametre pristupa.';
        return;
      }
      console.log('Kredencijali: ', email, password);
      this.authService.executeJwtAuthentication(email, password).subscribe(
          data => {
            console.log('Odogovor na login: '+data)
            this.dataLoading = false;
            this.router.navigate(['products']);
          },
          someError => {
            this.dataLoading = false;
            this.error = true;
            this.errorMessage = 'Pogrešan email ili lozinka.';
            console.log(this.errorMessage);
            //formData.reset();
          });

  }

  registrujNovogProdavca(formData: NgForm) {
    if(!this.imgProdavacDodat) {
      this.showFileErrorProdavac = true;
      return;
    }
    this.passwordReenteredErrorP = false;
    this.dataLoading = true;
    var nazivGazdinstva = formData.value.nazivGazdinstva;
    var imeprodavca = formData.value.imeprodavca;
    var prezimeprodavca = formData.value.prezimeprodavca;
    var emailprodavca = formData.value.emailprodavca;
    var lozinkaprodavca = formData.value.lozinkaprodavca;
    var ponovljenaLozinka = formData.value.reenteredpasswordprodavca;
    if(lozinkaprodavca !== ponovljenaLozinka) {
      this.passwordReenteredErrorP = true;
      this.dataLoading = false;
      return;
    }
    var kontaktprodavca = formData.value.kontaktprodavca;
    var minIznos = +formData.value.minIznos;
    var ulicaprodavca = formData.value.ulicaprodavca;
    var opis = formData.value.opis;
    var dd = formData.value.direktnaDostava;
    this.name = imeprodavca;
    if (dd !== true) {
      dd = false;
    }
    if (kd !== true) {
      kd = false;
    }
    var kd = formData.value.kurirskaDostava;
    var noviProdavac = new RegistracijaProdavcaDto( imeprodavca, prezimeprodavca,
       emailprodavca, lozinkaprodavca, kontaktprodavca, minIznos, ulicaprodavca,
       opis, dd, kd, this.selectedCity, nazivGazdinstva);
    this.apiService.registrujProdavca(noviProdavac).subscribe(
      response => {
        console.log('odgovor prihvacen');
        if (response['status'] === 'USPESNO') {

          var id = response['object'];
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.selectedFile, emailprodavca);
          this.apiService.sacuvajSlikuKorisnika(id, uploadImageData).subscribe(
            response => {
              if (response['status'] === 'USPESNO') {
                this.dataLoading = false;
                this.registerSuccessful = true;
                var status = response['status'];
                var poruka = response['poruka'];

                let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
                dialogRef.afterClosed().subscribe(
                  resp => {
                    if (status === 'USPESNO') {
                      // this.router.navigate(['/products']);
                      formData.reset();
                    }
                  }
                );
              }
            }
          )
        }
      },
      error => {
        console.log('greska');
        formData.reset();
      }
    );


  }

  registrujNovogKupca(formData: NgForm) {
    this.passwordReenteredErrorK = false;
    this.dataLoading = true;
    var ime = formData.value.imekupca;
    var prezime = formData.value.prezimekupca;
    var email = formData.value.emailkupca;
    var pass = formData.value.passwordkupca;
    var repeatedPassword = formData.value.reenteredpasswordkupca;
    if(pass !== repeatedPassword) {
      this.passwordReenteredErrorK = true;
      this.dataLoading = false;
      return;
    }
    var razlog = formData.value.razlog;
    var noviKupac = new RegistracijaKupcaDto(ime, prezime, email, pass, razlog);
    this.name = ime;
    this.apiService.registrujKupca(noviKupac).subscribe(
      response => {
        console.log('odgovor prihvacen');
        if(response['status'] === 'USPESNO') {

          var id = response['object'];
          const uploadImageData = new FormData();
          uploadImageData.append('imageFile', this.selectedFile, email);
          this.apiService.sacuvajSlikuKorisnika(id, uploadImageData).subscribe(
            response => {
              this.dataLoading = false;
              if (response['status'] === 'USPESNO') {
                this.registerSuccessful = true;

                var status = response['status'];
                var poruka = response['poruka'];

                let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, message: poruka}});
                dialogRef.afterClosed().subscribe(
                  resp => {
                    if (status === 'USPESNO') {
                      formData.reset();
                      // this.router.navigate(['/products/details']);
                    }
                  }
                );
              }
            }
          );

        }
      },
      error => {
        console.log('greska');
        formData.reset();
      }
    );
  }

  onFileChanged(event){
    this.selectedFile = event.target.files[0];

    this.imgProdavacDodat= true;
    if(this.showFileErrorProdavac) {
      this.showFileErrorProdavac = false;
    }
  }
}

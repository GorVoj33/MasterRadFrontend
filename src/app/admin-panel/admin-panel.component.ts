import { Component, OnInit } from '@angular/core';
import { NovaKategorijaDto } from '../dtos/novaKategorijaDto.model';
import { ApiServiceService } from '../services/api-service.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  sidebarOpened = false;
  selectedFileForCategory: File;

  constructor(private apiService: ApiServiceService, private dialog: MatDialog) { }

  ngOnInit() {
  }
  dodajNovuKategoriju(formData) {
    const naziv = formData.value.nazivKategorije;
    const slikaZaUpload = new FormData();
    slikaZaUpload.append('imageFile', this.selectedFileForCategory, naziv);
    var novaKategorija = new NovaKategorijaDto(naziv);
    this.apiService.sacuvajNovuKategoriju(novaKategorija).subscribe(
      response => {
        console.log('Kategorija sacuvana');
        console.log(response);
        this.apiService.sacuvajSlikuZaKategoriju(response['id'], slikaZaUpload).subscribe(
          response => {
            console.log('slika sacuvana')
            console.log(response);
            var status = response['status'];
            var poruka = response['poruka'];
            console.log(status, poruka)
            let dialogRef = this.dialog.open(MyDialogComponent, {data: {status: status, poruka: poruka}});
            dialogRef.afterClosed().subscribe(
              //uradi nesto , router npr
            )
          }
        )
      }
    )
  }
  onFileChangedForCategory(event) {
    this.selectedFileForCategory = event.target.files[0];
  }
  pregledMenija(){
    this.sidebarOpened = !this.sidebarOpened;
  }
}

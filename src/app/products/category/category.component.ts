import { Component, OnInit } from '@angular/core';
import { Kategorija } from 'src/app/classes/kategorija.model';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { MatDialog } from '@angular/material';
import { NovaKategorijaDto } from 'src/app/dtos/novaKategorijaDto.model';
import { MyDialogComponent } from 'src/app/my-dialog/my-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
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
              response => {
                formData.reset();
              }
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

}

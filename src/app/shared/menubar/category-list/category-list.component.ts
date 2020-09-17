import { Component, OnInit, Input } from '@angular/core';
import { Kategorija } from 'src/app/classes/kategorija.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @Input('kategorije') sveKategorije: Kategorija[] = [];
  constructor() { }

  ngOnInit(): void {
  }
  formImg(picByte) {
    return 'data:image/jpeg;base64,'+picByte;
  }
}

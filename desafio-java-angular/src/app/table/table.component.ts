import { Custumer } from '../register/custumer';
import { TableService } from './table.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(private tableService: TableService) {}
  @Input()
  base: Array<Custumer> = [];

  ngOnInit() {
    this.getList();
  }

  filterByText(filterText: any) {
    this.getList(filterText);
  }
  
  filterByMenu(filterMenu: any) {
    this.tableService
      .constructParams(filterMenu.nome, filterMenu.value)
      .subscribe({
        next: (response) => {
          this.base = response.content;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getList(text?: string) {
    this.tableService.buscarLista(text).subscribe({
      next: (response) => {
        this.base = response.content;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

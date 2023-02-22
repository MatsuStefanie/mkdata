import { Param } from '../param';
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
    let param = new Param('nome', filterText)
    this.getList(param);
  }

  clear(key: string) {
    this.tableService.removeParams(key).subscribe({
      next: (response) => {
        this.base = response.content;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  filterByMenu(filterMenu: Param) {
    this.tableService.buscarLista(filterMenu).subscribe({
      next: (response) => {
        this.base = response.content;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  rebase(response: boolean) {
    this.getList();
  }

  getList(text?: Param) {
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

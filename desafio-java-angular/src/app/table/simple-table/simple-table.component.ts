import { DialogComponent } from './../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Phone } from './../../register/telephone/phone';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
})
export class SimpleTableComponent implements OnInit {
  displayedColumns: string[] = ['telefone'];

  items: Array<Phone> = [];

  @Input()
  items$: Observable<Array<Phone>> = new Observable();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.items$.subscribe({ next: (item) => (this.items = item) });
  }

  deletePhone(phone: Phone) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        message: `Tem certeza de remover o telefone ${phone.numero}?`,
        title: 'Confirmação',
        true: 'Sim',
        false: 'Não',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      result
        ? this.removeElementFromStringArray(phone.numero)
        : this.openCancel();
    });
    return false;
  }

  openCancel() {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'Operação cancelada',
        title: 'Interrompido',
        true: 'Ok',
      },
    });

  }

  removeElementFromStringArray(element: string) {
    this.items.forEach((value, index) => {
      if (value.numero == element) this.items.splice(index, 1);
    });
  }
}

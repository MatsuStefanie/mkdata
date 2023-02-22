import { DialogComponent } from '../../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Phone } from '../../register/telephone/phone';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-simple-table',
  templateUrl: './edit-simple-table.component.html',
  styleUrls: ['./edit-simple-table.component.scss'],
})
export class EditSimpleTableComponent implements OnInit {
  displayedColumns: string[] = ['telefone'];

  dataPhone: Array<Phone> = [];

  @Input()
  items$: Observable<Array<Phone>> = new Observable();
  @Input()
  item$: Observable<Phone> = new Observable();
  @Input()
  remove$: Observable<number> = new Observable();

  @Output()
  phone = new EventEmitter<Phone>();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.items$.subscribe({
      next: (phones) => {
        this.dataPhone = phones;
        console.log(this.dataPhone);
      },
    });
    this.item$.subscribe({
      next: (phone) => {
        this.dataPhone
          .filter((current) => current.id == phone.id)
          .forEach((current) => {
            (current.ddd = phone.ddd), (current.numero = phone.numero);
          });
        console.log(this.dataPhone);
      },
    });
    this.remove$.subscribe({
      next: (num) => {
        this.dataPhone = this.dataPhone.filter((current) => current.id != num);
      },
    });
  }


  updatePhone(id?: number) {
    let phone: Phone | undefined = this.dataPhone.find((x) => x.id == id);
    this.phone.emit(phone);
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


}

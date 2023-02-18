import { Observable, Subscriber } from 'rxjs';
import { Phone } from './phone';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.scss'],
})
export class TelephoneComponent implements OnInit {
  phone!: FormGroup;

  @Output()
  end = new EventEmitter<boolean>();

  @Output()
  telephone = new EventEmitter<Array<Phone>>();

  arrayTelephone: Array<Phone> = [];

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.phone = this.formBuilder.group({
      telefone: [
        '',
        [
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(11),
          ]),
        ],
      ],
    });
  }

  addTelephones(info: string) {
    info = info.replace('(', '');
    info = info.replace(')', '');
    info.length == 10 || info.length == 11
      ? this.addSuccess(info)
      : this.openInfo();
  }
  addSuccess(info: string) {
    console.log('passou aqui', this.arrayTelephone, info);
    this.arrayTelephone.push(
      new Phone('+55', info.slice(0, 2), info.slice(2, 11), false)
    );
    this.telephone.emit(this.arrayTelephone);

    this.end.emit(true);
  }
  openInfo() {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'O telefone informado não está completo. Tente novamente',
        title: 'Telefone invalido',
        true: 'Ok',
      },
    });
  }
}

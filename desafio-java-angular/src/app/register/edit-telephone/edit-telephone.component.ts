import { BehaviorSubject } from 'rxjs';
import { Phone } from './../telephone/phone';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-edit-telephone',
  templateUrl: './edit-telephone.component.html',
  styleUrls: ['./edit-telephone.component.scss'],
})
export class EditTelephoneComponent implements OnInit {
  formTelephone!: FormGroup;

  @Output()
  end = new EventEmitter<boolean>();

  @Output()
  emitterPhone = new EventEmitter<Phone>();

  @Output()
  emitDelete = new EventEmitter<number>();

  phone: Phone = new Phone('+55', '', '', false);

  @Input()
  telephone$: BehaviorSubject<Phone> = new BehaviorSubject(this.phone);

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.telephone$.subscribe((r) => {
      this.phone = r;
      this.formTelephone?.controls['telefone'].setValue(
        `${this.phone.ddd}${this.phone.numero}`
      );
    });
    this.formTelephone = this.formBuilder.group({
      telefone: [
        `${this.telephone$.value.ddd}${this.telephone$.value.numero}`,
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

  deleteTelephone() {
    if (this.phone.id) {
      this.emitDelete.emit(this.phone.id)
    } else {
      this.formTelephone.reset();
    }

  }

  editTelephones(info: string) {
    info = info.replace('(', '');
    info = info.replace(')', '');
    info.length == 10 || info.length == 11
      ? this.emitUpdate(info)
      : this.openInfo();
  }

  emitUpdate(info: string) {
    this.phone = new Phone(
      '+55',
      info.slice(0, 2),
      info.slice(2, 11),
      false,
      this.phone.id
    );

    this.emitterPhone.emit(this.phone);
    this.formTelephone.reset();
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

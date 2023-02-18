import { Router } from '@angular/router';
import { DialogComponent } from './../dialog/dialog.component';

import {  BehaviorSubject } from 'rxjs';
import { Phone } from './telephone/phone';
import { MatDialog } from '@angular/material/dialog';
import { Custumer, TipoFederativo } from './custumer';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from './register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;

  physicPerson = TipoFederativo.CPF;
  legalPerson = TipoFederativo.CNPJ;
  showModalPhone: boolean = false;
  disabledButton: boolean = true;
  listPhone: Array<Phone> = [];
  obsListPhone: BehaviorSubject<Array<Phone>> = new BehaviorSubject(
    this.listPhone
  );
  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit() {
    this.register = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipoFederativo: ['', [Validators.required]],
      identificacaoFederal: ['', [Validators.required]],
      registro: ['', Validators.required],
      situacao: [true, Validators.required],
    });
  }

  end(ended: boolean) {
    this.disabledButton = !ended;
  }

  setListPhone(list: Phone[]) {
    this.obsListPhone.next(list);
  }
  openConfirm() {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'Cliente adicionado com sucesso',
        title: 'Sucesso',
        true: 'OK',
      },
    });
  }
  openError(err:any) {
    this.dialog.open(DialogComponent, {
      data: {
        message: `Cliente não foi adicionado: ${err.error.message}`,
        title: 'Invalido',
        true: 'OK',
      },
    });
  }

  backHome(){
    this.router.navigate(['']);
  }
  onRegister() {
    this.registerService.register(new Custumer(
      this.register.controls['nome'].value,
      this.register.controls['tipoFederativo'].value,
      this.register.controls['identificacaoFederal'].value.replace(/\D/g, ''),
      this.register.controls['registro'].value,
      this.register.controls['situacao'].value,
      this.obsListPhone.value
    )).subscribe(
      {next:()=>{this.openConfirm()},
      error:(err)=>{this.openError(err)}}
    )
    ;
  }
}

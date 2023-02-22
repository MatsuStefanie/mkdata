import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from './../dialog/dialog.component';

import { BehaviorSubject, switchMap, Observable } from 'rxjs';
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
  formRegister!: FormGroup;
  customer!: Custumer;
  idClient!: number;

  physicPerson = TipoFederativo.CPF;
  legalPerson = TipoFederativo.CNPJ;

  showModalPhone: boolean = false;
  disabledButton: boolean = true;
  isRegister: boolean = true;

  listPhone: Array<Phone> = [];
  listPhone$: BehaviorSubject<Array<Phone>> = new BehaviorSubject(
    this.listPhone
  );

  phone: Phone = new Phone('+55', '', '', false);
  phone$: BehaviorSubject<Phone> = new BehaviorSubject(this.phone);
  remove$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      nome: ['', [Validators.required]],
      tipoFederativo: ['', [Validators.required]],
      identificacaoFederal: ['', [Validators.required]],
      registro: ['', Validators.required],
      situacao: [true, Validators.required],
    });
    this.idClient = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idClient) {
      this.setInfo(this.idClient);
      this.isRegister = false;
    }
  }

  setInfo(id: number) {
    this.registerService.getCustomer(id).subscribe({
      next: (res) => {
        this.formRegister = this.formBuilder.group({
          nome: [res.nome, [Validators.required]],
          tipoFederativo: [res.tipoFederativo, [Validators.required]],
          identificacaoFederal: [
            res.identificacaoFederal,
            [Validators.required],
          ],
          registro: [res.registro, Validators.required],
          situacao: [res.situacao, Validators.required],
        });
        this.getListPhone();
      },
      error: (err) => {
        this.backHome();
        this.openError(err);
      },
    });
  }

  end(ended: boolean) {
    if (!this.isRegister) {
      this.getListPhone()
    }
    this.disabledButton = !ended;
  }

  telephoneSelect(phone: Phone) {
    this.phone$.next(phone);
  }

  phoneEdited(phone: Phone) {
    this.phone$.next(phone);
  }
  delPhone(num : number){
    this.remove$.next(num);
  }
  setListPhone(list: Phone[]) {
    this.listPhone$.next(list);
  }

  getListPhone() {
    this.registerService.getTelephones(this.idClient).subscribe({
      next: (response) => {
        this.listPhone$.next(response);
      },
    });
  }

  openSuccess() {
    this.dialog.open(DialogComponent, {
      data: {
        message: 'Cliente adicionado com sucesso',
        title: 'Sucesso',
        true: 'OK',
      },
    });
    this.backHome();
  }

  openError(err: any) {
    this.dialog.open(DialogComponent, {
      data: {
        message: `Cliente não foi adicionado: ${err.error.message}`,
        title: 'Invalido',
        true: 'OK',
      },
    });
  }

  backHome() {
    this.router.navigate(['']);
  }

  onSubmit() {
    this.isRegister ? this.register() : this.update();
  }

  register() {
    this.registerService
      .register(
        new Custumer(
          this.formRegister.controls['nome'].value,
          this.formRegister.controls['tipoFederativo'].value,
          this.formRegister.controls['identificacaoFederal'].value.replace(
            /\D/g,
            ''
          ),
          this.formRegister.controls['registro'].value,
          this.formRegister.controls['situacao'].value,
          this.listPhone$.value
        )
      )
      .subscribe({
        next: () => {
          this.openSuccess();
        },
        error: (err) => {
          this.openError(err);
        },
      });
  }

  update() {
    this.registerService
      .update(
        new Custumer(
          this.formRegister.controls['nome'].value,
          this.formRegister.controls['tipoFederativo'].value,
          this.formRegister.controls['identificacaoFederal'].value.replace(
            /\D/g,
            ''
          ),
          this.formRegister.controls['registro'].value,
          this.formRegister.controls['situacao'].value,
          this.listPhone$.getValue(),
          this.idClient
        ),
      )
      .subscribe({
        next: () => {
          this.openSuccess();
        },
        error: (err) => {
          this.openError(err);
        },
      });
  }
}

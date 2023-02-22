import { Param } from './../../param';
import { TipoFederativo, Situacao } from './../../register/custumer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-table-list',
  templateUrl: './filter-table-list.component.html',
  styleUrls: ['./filter-table-list.component.scss'],
})
export class FilterTableListComponent implements OnInit {
  situacaoAtivo = Situacao.ATIVO;
  situacaoInativo = Situacao.INATIVO;

  ativo: boolean;
  inativo: boolean;
  cpf: boolean;
  cnpj: boolean;
  tipo?: boolean;
  formSearch!: FormGroup;
  tipoCPF = TipoFederativo.CPF;
  tipoCNPJ = TipoFederativo.CNPJ;
  @Output()
  filterText = new EventEmitter<string>();
  @Output()
  filterMenu = new EventEmitter<Param>();

  @Output()
  emitter= new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {
    this.ativo = false;
    this.inativo = false;
    this.cpf = false;
    this.cnpj = false;
  }

  ngOnInit(): void {
    this.formSearch = this.formBuilder.group({
      busca: [null],
    });
  }

  filterByText(text: string) {
    this.filterText.emit(text);
  }

  filterSituacao(situacao: Situacao) {
    if (situacao == Situacao.ATIVO) {
      this.inativo = false;
    } else if (situacao == Situacao.INATIVO) {
      this.ativo = false;
    }

    if (this.ativo || this.inativo) {
      let filter;
      if (this.ativo) {
        filter = new Param('situacao', 'ATIVO');
      }
      if(this.inativo) {
        filter = new Param('situacao', 'INATIVO');
      }
      this.filterMenu.emit(filter);
    } else {
      this.emitter.emit('situacao');
    }
  }

  filterTipo(tipo: TipoFederativo) {
    if (tipo == TipoFederativo.CPF) {
      this.cnpj = false;
    } else if (tipo == TipoFederativo.CNPJ) {
      this.cpf = false;
    }

    if (this.cpf || this.cnpj) {
      this.filterMenu.emit(new Param('tipoFederativo', tipo));
    } else {
      this.emitter.emit('tipoFederativo');
    }
  }

  cleanText() {
    this.formSearch.controls['busca'].setValue('');
    this.filterText.emit('');
  }

  unselectAll() {
    this.ativo = false;
    this.inativo = false;
    this.cpf = false;
    this.cnpj = false;
    this.emitter.emit('situacao');
    this.emitter.emit('tipoFederativo');
  }
}

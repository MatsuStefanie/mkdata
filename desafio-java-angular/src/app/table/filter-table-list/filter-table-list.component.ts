import { Custumer } from 'src/app/register/custumer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableService } from './../table.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-table-list',
  templateUrl: './filter-table-list.component.html',
  styleUrls: ['./filter-table-list.component.scss'],
})
export class FilterTableListComponent implements OnInit {
  ativo: boolean;
  inativo: boolean;
  situacao: boolean;
  cpf: boolean;
  cnpj: boolean;
  tipo: boolean;
  formSearch!: FormGroup;
  @Output()
  filterText = new EventEmitter<string>();
  @Output()
  filterMenu = new EventEmitter<{nome:string;value:string}>();

  constructor(private formBuilder: FormBuilder) {
    this.ativo = false;
    this.inativo = false;
    this.situacao = false;
    this.cpf = false;
    this.cnpj = false;
    this.tipo = false;
  }

  ngOnInit(): void {
    this.formSearch = this.formBuilder.group({
      busca: [null],
    });
  }
  filterByText(text: string) {
    this.filterText.emit(text);
  }

  filterByMenuSituacao(situacao: boolean) {
    if ((this.situacao = !situacao)) {
      if (this.ativo) {
        this.filterMenu.emit({ nome: 'situacao', value: 'ATIVO' });
      }
      if (this.inativo) {
        this.filterMenu.emit({ nome: 'situacao', value: 'INATIVO' });
      }
    }
  }

  filterByMenuTipo(tipo: boolean) {
    if(this.tipo = !tipo){
      if (this.cpf) {
        this.filterMenu.emit({ nome: 'tipoFederativo', value: 'CPF' });
      }
      if (this.cnpj) {
        this.filterMenu.emit({ nome: 'tipoFederativo', value: 'CNPJ' });
      }
    }
  }

  cleanFilter() {
    this.formSearch.controls['busca'].setValue('');
    this.filterText.emit('');
  }

  selectAll() {
    this.ativo = true;
    this.inativo = true;
    this.cpf = true;
    this.cnpj = true;
    this.tipo = false;
    this.situacao = false;
    this.filterText.emit('');
  }

  unselectAll() {
    this.ativo = false;
    this.inativo = false;
    this.cpf = false;
    this.cnpj = false;
    this.tipo = false;
    this.situacao = false;
    this.filterText.emit('');
  }
}

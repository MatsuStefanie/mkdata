import { Phone } from './telephone/phone';

export interface Custumer {
  id: number|undefined;
  nome: string;
  tipoFederativo: TipoFederativo;
  identificacaoFederal: string;
  registro: string;
  situacao: Situacao;
  telefones: Phone[];
}

export enum TipoFederativo {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}
export enum Situacao {
  ATIVO = 1,
  INATIVO = 0,
}

export class Custumer {
  nome: string;
  tipoFederativo: TipoFederativo;
  identificacaoFederal: string;
  registro: string;
  situacao: Situacao;
  telefones: Phone[];
  id: number|undefined;

  constructor(
    nome: string,
    tipoFederativo: TipoFederativo,
    identificacaoFederal: string,
    registro: string,
    situacao: Situacao,
    telefones: Phone[],
    id?:number
  ) {
    this.nome = nome;
    this.tipoFederativo = tipoFederativo;
    this.identificacaoFederal = identificacaoFederal;
    this.registro = registro;
    this.situacao=situacao;
    this.telefones=telefones;
    this.id= id;
  }
}

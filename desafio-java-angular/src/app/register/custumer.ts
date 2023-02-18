import { Phone } from './telephone/phone';

export interface Custumer {
  id: number;
  nome: string;
  tipoFederativo: TipoFederativo;
  identificacaoFederal: string;
  registro: string;
  situacao: boolean;
  telefones: Phone[];
}

export enum TipoFederativo {
  CPF = 'CPF',
  CNPJ = 'CNPJ',
}

export class Custumer {
  nome: string;
  tipoFederativo: TipoFederativo;
  identificacaoFederal: string;
  registro: string;
  situacao: boolean;
  telefones: Phone[];

  constructor(
    nome: string,
    tipoFederativo: TipoFederativo,
    identificacaoFederal: string,
    registro: string,
    situacao: boolean,
    telefones: Phone[]
  ) {
    this.nome = nome;
    this.tipoFederativo = tipoFederativo;
    this.identificacaoFederal = identificacaoFederal;
    this.registro = registro;
    this.situacao=situacao;
    this.telefones=telefones
  }
}

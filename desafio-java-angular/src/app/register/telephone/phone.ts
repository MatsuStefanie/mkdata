export interface Phone {
  id?: number;
  pais: string;
  ddd: string;
  numero: string;
  principal: boolean;
}
export class Phone {
  id?: number;
  pais: string;
  ddd: string;
  numero: string;
  principal: boolean;

  constructor(pais: string, ddd: string, numero: string, principal: boolean) {
    this.pais = pais;
    this.ddd = ddd;
    this.numero = numero;
    this.principal = principal;
  }
}

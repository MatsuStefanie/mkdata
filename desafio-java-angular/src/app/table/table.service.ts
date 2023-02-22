import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Param } from '../param';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private httpClient: HttpClient) {}
  params = new HttpParams();

  removeParams(key: string) {
    this.params = this.params.delete(key);
    return this.buscarLista();
  }

  constructParams(param: Param) {
    this.params = this.params.set(param.key, param.value);
  }

  buscarLista(newParams?: Param): Observable<any> {
    if (newParams) {
      this.constructParams(newParams);
    }

    return this.httpClient.get(`${environment.baseUrl}/clientes`, {
      params: this.params,
    });
  }

  deletarUser(id: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${environment.baseUrl}/clientes/${id}`
    );
  }
}

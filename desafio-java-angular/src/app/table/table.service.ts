import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private httpClient: HttpClient) {}

   constructParams(nome: string, value: string){
    let params = new HttpParams();
    params = params.append(nome, value);
    return this.buscarLista(undefined, params);
  }

  buscarLista(text?: string, newParams?: HttpParams): Observable<any> {
    let params = new HttpParams();
    if (newParams) {
      params = newParams;
    }
    if (text) {
      params = params.append('nome', text);
    }

    return this.httpClient.get(`${environment.baseUrl}/clientes`, { params });
  }
  deletarUser(id: number): Observable<number> {
    return this.httpClient.delete<number>(
      `${environment.baseUrl}/clientes/${id}`
    );
  }
}

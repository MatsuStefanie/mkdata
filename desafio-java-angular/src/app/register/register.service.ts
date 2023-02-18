import { environment } from './../../environments/environment';

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Custumer } from './custumer';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClient: HttpClient) {}

  register(custumer: Custumer): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/clientes`, custumer);
  }

  update(id: number, custumer: Custumer): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/clientes/${id}`,
      custumer
    );
  }

  updatePhone(id: number, custumer: Custumer) {
    return this.httpClient.put(
      `${environment.baseUrl}/clientes/${id}/telefones`,
      custumer
    );
  }

  deletePhone(id: number, idPhone: number) {
    return this.httpClient.delete(
      `${environment.baseUrl}/clientes/${id}/telefones/${idPhone}`
    );
  }
  createNewPhone(custumer: Custumer): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/clientes/${custumer.id}/telefones`,
      custumer
    );
  }
getTelephones(custumer: Custumer){
  return this.httpClient.get(
    `${environment.baseUrl}/clientes/${custumer.id}/telefones`,

  );
}
}

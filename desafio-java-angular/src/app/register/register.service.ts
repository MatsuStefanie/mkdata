import { Phone } from './telephone/phone';
import { environment } from './../../environments/environment';

import { Observable, tap } from 'rxjs';
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

  getCustomer(id: number): Observable<Custumer> {
    return this.httpClient.get<Custumer>(
      `${environment.baseUrl}/clientes/${id}`
    );
  }

  update(custumer: Custumer): Observable<any> {
    this.updatePhone(custumer);

    return this.httpClient.put(
      `${environment.baseUrl}/clientes/${custumer.id}`,
      custumer
    );
  }

  updatePhone(custumer: Custumer) {
    custumer.telefones.forEach((element) => {
      this.httpClient
        .put<Phone>(
          `${environment.baseUrl}/clientes/${custumer.id}/telefones`,
          element
        )
        .subscribe()
        .unsubscribe();
    });
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

  getTelephones(id: number) {
    return this.httpClient.get<Phone[]>(
      `${environment.baseUrl}/clientes/${id}/telefones`
    );
  }
}

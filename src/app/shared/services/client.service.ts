import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.prod';
import { ClientData } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) {}

  GetClientsData(client_id: any) {
    let url = this.baseURL + 'Clients';
    let params = new HttpParams().set('Id', client_id);
    return this.http.get(url, { params });
  }
  AddOrEditClientData(data: ClientData) {
    let url = this.baseURL + 'Clients';
    const body = '';
    return this.http.post(url, body);
  }
}

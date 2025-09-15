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
  AddOrEditClientData(data: ClientData, client_id?: any) {
    let url = this.baseURL + 'Clients';
    let params = new HttpParams();

    if (client_id) {
      params = params.set('Id', client_id);
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });
    return this.http.post(url, formData, { params });
  }
}

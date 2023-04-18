import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from '../../server/urls';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }

  createAccount(data: any) {
    return this.http.post(urls.account.create, data, httpOptions);
  }

  getAccount(email: string) {
    let url = urls.account.find + email;
    return this.http.get(url);
  }

  getGeneral() {
    return this.http.get(urls.general);
  }

  getGenusNames(limit:number) {
    return this.http.get(
      urls.genusCounts,
      {
        params: {
          limit: limit
        }
      }
    );
  }
  
}

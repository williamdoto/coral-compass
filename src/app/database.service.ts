import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from '../../server/urls';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

const formHttpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }

  createAccount(data: any) {
    return this.http.post(urls.account.create, data, httpOptions);
  }

  login(email:string, password:string) {
    const body = `email=${email}&password=${password}`;
    return this.http.post(urls.account.login, body, formHttpOptions);
  }

  getAccount(email: string) {
    let url = urls.account.find + email;
    return this.http.get(url);
  }

  getGeneral() {
    return this.http.get(urls.general);
  }

  importGeneral(data: any) {
    return this.http.post(urls.general, data, httpOptions);
  }
  importCatalog(data: any) {
    return this.http.post(urls.catalog, data, httpOptions);
  }
  importLocation(data: any) {
    return this.http.post(urls.location, data, httpOptions);
  }
  importOccurence(data: any) {
    return this.http.post(urls.occurence, data, httpOptions);
  }
  importRecord(data: any) {
    return this.http.post(urls.record, data, httpOptions);
  }
  importTaxon(data: any) {
    return this.http.post(urls.taxon.insert, data, httpOptions);
  }
  importInstitution(data: any) {
    return this.http.post(urls.institution, data, httpOptions);
  }

  getTaxon(name:string) {
    return this.http.get("/api/taxon/" + name);
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

  getTemperatures() {
    return this.http.get(urls.temperatures.temperatures);
  }
  
}

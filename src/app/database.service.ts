import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }

  createAccount(data: any) {
    return this.http.post("api/account", data, httpOptions);
  }

  getAccount(email: string) {
    let url = "api/account/" + email;
    return this.http.get(url);
  }

  getGeneral() {
    return this.http.get("api/general/");
  }

  getGenusNames(limit:number) {
    return this.http.get(
      "api/genus-count/",
      {
        params: {
          limit: limit
        }
      }
    );
  }
  
}

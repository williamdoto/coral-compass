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
    return this.http.post("http://localhost:4000/account", data, httpOptions);
  }

  getAccount(email: string) {
    let url = "http://localhost:4000/account/" + email;
    return this.http.get(url);
  }

  getGeneral() {
    return this.http.get("http://localhost:4000/general/");
  }
}

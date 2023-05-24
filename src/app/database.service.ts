/**
 * This file contains the functions used to make requests back to the server.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urls } from '../../server/urls';

/**
 * Options for json formatted data.
 */
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

/**
 * Options for form encoded data.
 */
const formHttpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" })
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private http: HttpClient) { }

  /**
   * Requests that an account be created.
   * @param username the username to create.
   * @param email the email to use.
   * @param password the password to use.
   * @returns observable that allows the status of the request to be tracked.
   */
  createAccount(username: string, email: string, password: string) {
    const groupedData = { username: username, email: email, password: password };
    return this.http.post(urls.account.create, groupedData, httpOptions);
  }

  /**
   * Requests that the user log in.
   * @param email the email to log in with.
   * @param password the password to use.
   * @returns observable that allows the status of the request to be tracked.
   */
  login(email: string, password: string) {
    const body = `email=${email}&password=${password}`;
    return this.http.post(urls.account.login, body, formHttpOptions);
  }

  /**
   * Requests to see if the user is logged in.
   * @returns observable that allows the status of the request to be tracked.
   */
  isLoggedin() {
    return this.http.get(urls.account.isLogged)
  }

  /**
   * Requests information about the user account.
   * @param email the email to check.
   * @returns observable that allows the status of the request to be tracked.
   */
  getAccount(email: string) {
    let url = urls.account.find + email;
    return this.http.get(url);
  }

  /**
   * Gets data from the general collection of the database.
   * @returns observable that allows the status of the request to be tracked.
   */
  getGeneral() {
    return this.http.get(urls.general.list);
  }

  /**
   * Gets data on all species.
   * @returns observable that allows the status of the request to be tracked.
   */
  getSpecies() {
    return this.http.get(urls.taxon.species);
  }

  /**
   * Imports data into the general collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importGeneral(data: any) {
    return this.http.post(urls.general.import, data, httpOptions);
  }

  /**
   * Imports data into the catalogue collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importCatalog(data: any) {
    return this.http.post(urls.catalog, data, httpOptions);
  }

  /**
   * Imports data into the location collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importLocation(data: any) {
    return this.http.post(urls.location, data, httpOptions);
  }

  /**
   * Imports data into the occurance collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importOccurence(data: any) {
    return this.http.post(urls.occurence, data, httpOptions);
  }

  /**
   * Imports data into the record collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importRecord(data: any) {
    return this.http.post(urls.record, data, httpOptions);
  }

  /**
   * Imports data into the taxon collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importTaxon(data: any) {
    return this.http.post(urls.taxon.insert, data, httpOptions);
  }

  /**
   * Imports data into the institution collection.
   * @returns observable that allows the status of the request to be tracked.
   */
  importInstitution(data: any) {
    return this.http.post(urls.institution, data, httpOptions);
  }

  /**
   * Requests the data for a specific species.
   * @param name the scientific name of the species.
   * @returns observable that allows the status of the request to be tracked.
   */
  getTaxon(name: string) {
    return this.http.get("/api/taxon/" + name);
  }

  /**
   * Gets the most common genuses.
   * @param limit how many genuses to return
   * @returns observable that allows the status of the request to be tracked.
   */
  getGenusNames(limit: number) {
    return this.http.get(
      urls.taxon.genusCounts,
      {
        params: {
          limit: limit
        }
      }
    );
  }

  /**
   * Gets the most common species in a particular genus.
   * @param limit how many species to return.
   * @param genus what genus to filter by.
   * @returns observable that allows the status of the request to be tracked.
   */
  getSpeciesNames(limit: number, genus: string) {
    return this.http.get(
      urls.taxon.speciesCounts,
      {
        params: {
          limit: limit,
          genus: genus
        }
      }
    );
  }

  /**
   * Gets all temperature data.
   * @returns observable that allows the status of the request to be tracked.
   */
  getTemperatures() {
    return this.http.get(urls.temperatures.temperatures);
  }
}

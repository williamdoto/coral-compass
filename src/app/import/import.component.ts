import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
var mongoose = require('mongoose');

enum AccountType {
  NotLoggedIn,
  User // TODO: Add more roles
}

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  message: string = '';
  example: string = '[{"dcterms:modified":"2015/6/28","institutionCode":"QM", ... rest of data}]';
  status: string = '';
  isLoggedin: any = false;

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit() {
    this.dbService.isLoggedin().subscribe(data => {
      console.log(data)
      this.isLoggedin = data;
    })
    console.log(this.isLoggedin)
  }


  onSubmit() {


    // console.log("data:")
    // console.log(this.isLoggedin)
    this.message = this.message.trimStart().trimEnd()

    if (this.message[0] == '[' && this.message[this.message.length - 1] == ']') {
      try {
        let submission = JSON.parse(this.message);
      }
      catch (e) {
        this.status = 'Your message is not valid JSON';
        return;
      }
      let submission = JSON.parse(this.message)

      for (let i = 0; i < submission.length; i++) {
        let data = submission[i]
        let id = new mongoose.Types.ObjectId();
        data["_id"] = id
        console.log(id);
        this.dbService.importCatalog({ _id: id, catalogNumber: data["catalogNumber"], otherCatalogNumbers: data["otherCatalogNumbers"], collectionCode: data["collectionCode"] }).subscribe(result => { console.log(result) })
        this.dbService.importInstitution({ _id: id, institutionCode: data["institutionCode"] }).subscribe(result => { console.log(result) })
        this.dbService.importLocation({ _id: id, country: data["country"], decimalLatitude: data["decimalLatitude"], decimalLongitude: data["decimalLongitude"], geodeticDatum: data["geodeticDatum"], stateProvince: data["stateProvince"] }).subscribe(result => { console.log(result) })
        this.dbService.importOccurence({ _id: id, occurrenceID: data["occurrenceID"], occurrenceStatus: data["occurrenceStatus"], preparations: data["preparations"] }).subscribe(result => { console.log(result) })
        this.dbService.importRecord({ _id: id, associatedOccurrences: data["associatedOccurrences"], basisOfRecord: data["basisOfRecord"], recordedBy: data["recordedBy"] }).subscribe(result => { console.log(result) })
        this.dbService.importTaxon({
          _id: id, family: data["family"], genus: data["genus"], kingdom: data["kingdom"], order: data["order"], phylum: data["phylum"], specificEpithet: data["specificEpithet"], taxonConceptID: data["taxonConceptID"],
          taxonID: data["taxonID"], taxonRank: data["taxonRank"], class: data["class"], scientificName: data["scientificName"], scientificNameAuthorship: data["scientificNameAuthorship"]
        }).subscribe(result => { console.log(result) })
        this.dbService.importGeneral(data).subscribe(result => {
          console.log(result)
          this.status = 'Successful submission the database!'
          console.log('Form submitted', this.message);
        });
      }
    }
    else {
      this.status = 'Your format is incorrect'
    }
  }
}

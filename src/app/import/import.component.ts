import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from "@angular/router";
var mongoose = require('mongoose');

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent {
  message: string = '';


  constructor(private dbService: DatabaseService, private router: Router) { }

  onSubmit() {
    console.log('Form submitted', this.message);
    let submission = eval(this.message)

    for (let i = 0; i < submission.length; i++){
        let data = submission[i]
        let id = new mongoose.Types.ObjectId();
        data["_id"] = id
        console.log(id);
        this.dbService.importCatalog({_id: id, catalogNumber: data["catalogNumber"], otherCatalogNumbers: data["otherCatalogNumbers"], collectionCode: data["collectionCode"] }).subscribe(result => {console.log(result)})
        this.dbService.importInstitution({_id: id, institutionCode: data["institutionCode"]}).subscribe(result => {console.log(result)})
        this.dbService.importLocation({_id: id, country: data["country"], decimalLatitude: data["decimalLatitude"], decimalLongitude: data["decimalLongitude"], geodeticDatum: data["geodeticDatum"], stateProvince: data["stateProvince"]}).subscribe(result => {console.log(result)})
        this.dbService.importOccurence({_id: id, occurrenceID: data["occurrenceID"], occurrenceStatus: data["occurrenceStatus"], preparations: data["preparations"]}).subscribe(result => {console.log(result)})
        this.dbService.importRecord({_id: id, associatedOccurrences: data["associatedOccurrences"], basisOfRecord: data["basisOfRecord"], recordedBy: data["recordedBy"]}).subscribe(result => {console.log(result)})
        this.dbService.importTaxon({_id: id, family: data["family"], genus: data["genus"], kingdom: data["kingdom"], order: data["order"], phylum: data["phylum"], specificEpithet: data["specificEpithet"], taxonConceptID: data["taxonConceptID"], 
        taxonID: data["taxonID"], taxonRank: data["taxonRank"], class: data["class"], scientificName: data["scientificName"], scientificNameAuthorship: data["scientificNameAuthorship"]}).subscribe(result => {console.log(result)})
        this.dbService.importGeneral(data).subscribe(result => {
            console.log(result)
        });
    }



  }
}

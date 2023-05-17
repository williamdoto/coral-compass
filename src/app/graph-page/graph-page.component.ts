import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { GenusColourPair } from '../../models/taxon';

@Component({
  selector: 'app-graph-page',
  templateUrl: './graph-page.component.html',
  styleUrls: ['./graph-page.component.css']
})
export class GraphPageComponent {
  // Using observables for passing names based on https://stackoverflow.com/a/50281255.
  genusSubject: Subject<GenusColourPair> = new Subject();

  /**
   * Adds a new genus and colour to the genusSubject subject. This is used to
   * call the species graph component to update.
   * @param genus the name and colour of the genus.
   */
  changeGenus(genus:GenusColourPair) {
    console.log("ChangeGenus");
    console.log(genus);
    this.genusSubject.next(genus)
  }
}

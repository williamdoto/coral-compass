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

  changeGenus(genus:GenusColourPair) {
    console.log("ChangeGenus");
    console.log(genus);
    this.genusSubject.next(genus)
  }
}

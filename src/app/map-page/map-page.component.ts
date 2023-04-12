import { Component,OnInit,ChangeDetectorRef,AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DatabaseService } from '../database.service';
import { environment } from './environment';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {
  map!: mapboxgl.Map;
  markers: any[] = [];
  db: any[] = []

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(){

    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.9772, 40.7666],
      zoom: 12
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.dbService.getGeneral().subscribe((data: any) => {
      this.db = data;
      console.log(data)
      for (let i = 0; i < this.db.length; i++){
        if (this.db[i]["decimalLongitude"] != null && this.db[i]["decimalLongitude"] != undefined){
        let marker1 = new mapboxgl.Marker()
        .setLngLat([parseInt(this.db[i]["decimalLongitude"]), parseInt(this.db[i]["decimalLatitude"])])
        .addTo(this.map);
        this.markers.push(marker1);
        }
      }
    });

    // .setPopup(new mapboxgl.Popup().setHTML('<h3>Example Marker 1</h3><p>Description for marker 1.</p>'))

  }
  
}

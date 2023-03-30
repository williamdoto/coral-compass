import { Component,OnInit,ChangeDetectorRef,AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from './environment';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent {
  map!: mapboxgl.Map;

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
  }
  
}

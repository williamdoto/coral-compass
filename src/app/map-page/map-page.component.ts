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
  markers: any[] = [];

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
    const marker1 = new mapboxgl.Marker()
    .setLngLat([-74.5, 40.5])
    .setPopup(new mapboxgl.Popup().setHTML('<h3>Example Marker 1</h3><p>Description for marker 1.</p>'))
    .addTo(this.map);

    this.markers.push(marker1);


  }
  
}

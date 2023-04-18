import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DatabaseService } from '../database.service';
import { environment } from './environment';
import { FeatureCollection, Point } from '@turf/helpers';
import { MapMouseEvent } from 'mapbox-gl';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit, AfterViewInit {
  map!: mapboxgl.Map;
  db: any[] = [];

  constructor(private dbService: DatabaseService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.9772, 40.7666],
      zoom: 12
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.dbService.getGeneral().subscribe((data: any) => {
        this.db = data;
        const geojson:  FeatureCollection<Point>= {
          type: 'FeatureCollection',
          features: this.db.map(item => {
            return {
              type: 'Feature',
              properties: {scientificName: item.scientificName},
              geometry: {
                type: 'Point',
                coordinates: [parseFloat(item.decimalLongitude), parseFloat(item.decimalLatitude)]
              }
            };
          })
        };

        this.map.addSource('markers', {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        this.map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'markers',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        this.map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'markers',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });

        this.map.addLayer({
          id: 'unclustered-points',
          type: 'circle',
          source: 'markers',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });
      });
    });

    this.map.on('click', 'unclustered-points', (e: MapMouseEvent) => {
      const features = this.map.queryRenderedFeatures(e.point, { layers: ['unclustered-points'] });
      if (!features.length) {
        return;
      }
    
    const feature = features[0] as mapboxgl.MapboxGeoJSONFeature;
    const coordinates = (feature.geometry as Point).coordinates.slice();
    const sName =  feature.properties ? feature.properties['scientificName'] : 'Unknown';

      // Ensure that if the map is zoomed out such that
      // multiple copies of the feature are visible, the
      // popup appears over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      new mapboxgl.Popup().setLngLat([coordinates[0],coordinates[1]]).setHTML(`Scientific Name: ${sName}<br>`).addTo(this.map);
      });

      this.map.on('click', 'clusters', (e: MapMouseEvent) => {
        const features = this.map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        if (!features.length) {
          return;
        }
      
        const feature = features[0] as mapboxgl.MapboxGeoJSONFeature;
        const clusterId = feature.properties?.['cluster_id'];
      
        if (typeof clusterId !== 'undefined') {
          (this.map.getSource('markers') as mapboxgl.GeoJSONSource).getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
            if (err) {
              console.error(`Error getting cluster expansion zoom: ${err}`);
              return;
            }
      
            const coordinates = (feature.geometry as Point).coordinates.slice();
            this.map.easeTo({
              center: [coordinates[0],coordinates[1]],
              zoom: zoom
            });
          });
        }
      });
  }
}

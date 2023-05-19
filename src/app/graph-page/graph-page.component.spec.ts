import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPageComponent } from './graph-page.component';
import { GraphGenusBarComponent } from '../graph-genus-bar/graph-genus-bar.component';
import { GraphSpeciesBarComponent } from '../graph-species-bar/graph-species-bar.component';
import { GraphTemperatureComponent } from '../graph-temperature/graph-temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

describe('GraphPageComponent', () => {
  let component: GraphPageComponent;
  let fixture: ComponentFixture<GraphPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgChartsModule
      ],
      declarations: [ GraphPageComponent, GraphGenusBarComponent, GraphSpeciesBarComponent, GraphTemperatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

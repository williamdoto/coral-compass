import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTemperatureComponent } from './graph-temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

describe('GraphTemperatureComponent', () => {
  let component: GraphTemperatureComponent;
  let fixture: ComponentFixture<GraphTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphTemperatureComponent ],
      imports: [HttpClientModule, NgChartsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

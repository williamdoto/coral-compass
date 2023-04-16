import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphPieChartComponent } from './graph-pie-chart.component';

describe('GraphPieChartComponent', () => {
  let component: GraphPieChartComponent;
  let fixture: ComponentFixture<GraphPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphPieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSpeciesBarComponent } from './graph-species-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

describe('GraphSpeciesBarComponent', () => {
  let component: GraphSpeciesBarComponent;
  let fixture: ComponentFixture<GraphSpeciesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSpeciesBarComponent ],
      imports: [HttpClientModule, NgChartsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphSpeciesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

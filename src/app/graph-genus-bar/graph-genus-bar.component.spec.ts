import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphGenusBarComponent } from './graph-genus-bar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';

describe('GraphGenusBarComponent', () => {
  let component: GraphGenusBarComponent;
  let fixture: ComponentFixture<GraphGenusBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphGenusBarComponent ],
      imports: [HttpClientModule, NgChartsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphGenusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

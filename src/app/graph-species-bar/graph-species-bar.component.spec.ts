import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphSpeciesBarComponent } from './graph-species-bar.component';

describe('GraphSpeciesBarComponent', () => {
  let component: GraphSpeciesBarComponent;
  let fixture: ComponentFixture<GraphSpeciesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphSpeciesBarComponent ]
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

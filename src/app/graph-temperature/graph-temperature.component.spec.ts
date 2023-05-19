import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTemperatureComponent } from './graph-temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { error } from 'console';

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

  describe('convert years successfully', () => {
    // date +%s000 -u -d 1970-01-01
    const accuracy = 0.05; // 5%
    function errorFraction(actual:number, expected:number):number {
      if (expected === 0 && actual === 0) {
        return 0;
      }
      return Math.abs((expected - actual) / expected);
    }

    it('1970 => 0', () => {
      expect(errorFraction(component.yearToTimestamp(1970), 0)).toBeLessThan(accuracy);
    });
    it('1971 => 31536000000', () => {
      expect(errorFraction(component.yearToTimestamp(1971), 31536000000)).toBeLessThan(accuracy);
    });
    it('2023 => 1672531200000', () => {
      expect(errorFraction(component.yearToTimestamp(2023), 1672531200000)).toBeLessThan(accuracy);
    });
    it('1900 => -2208988800000', () => {
      expect(errorFraction(component.yearToTimestamp(1900), -2208988800000)).toBeLessThan(accuracy);
    });
  });
});

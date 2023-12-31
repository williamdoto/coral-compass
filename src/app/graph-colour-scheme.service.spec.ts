import { TestBed } from '@angular/core/testing';

import { GraphColourSchemeService } from './graph-colour-scheme.service';

describe('GraphColourSchemeService', () => {
  let service: GraphColourSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphColourSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is an array of colours', () => {
    expect(service.colourScheme.length).toBeGreaterThan(0);
  });
});

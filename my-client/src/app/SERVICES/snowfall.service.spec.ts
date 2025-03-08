import { TestBed } from '@angular/core/testing';

import { SnowfallService } from './snowfall.service';

describe('SnowfallService', () => {
  let service: SnowfallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnowfallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

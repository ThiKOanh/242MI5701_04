import { TestBed } from '@angular/core/testing';

import { AdminCosmeticService } from './admin-cosmetic.service';

describe('AdminCosmeticService', () => {
  let service: AdminCosmeticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCosmeticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

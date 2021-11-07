import { TestBed } from '@angular/core/testing';

import { ProductsBrandService } from './productsbrand.service';

describe('ProductsBrandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsBrandService = TestBed.get(ProductsBrandService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ContactUSService } from './contactUs.service';

describe('ContactUSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactUSService = TestBed.get(ContactUSService);
    expect(service).toBeTruthy();
  });
});

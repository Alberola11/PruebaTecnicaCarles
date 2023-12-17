import { TestBed } from '@angular/core/testing';

import { RtdbEuropeService } from './rtdb-europe.service';

describe('RtdbEuropeService', () => {
  let service: RtdbEuropeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtdbEuropeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

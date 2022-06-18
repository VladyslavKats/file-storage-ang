import { TestBed } from '@angular/core/testing';

import { IterceptorService } from './iterceptor.service';

describe('IterceptorService', () => {
  let service: IterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

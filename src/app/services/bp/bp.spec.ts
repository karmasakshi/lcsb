import { TestBed } from '@angular/core/testing';

import { Bp } from './bp';

describe('Bp', () => {
  let service: Bp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Bp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

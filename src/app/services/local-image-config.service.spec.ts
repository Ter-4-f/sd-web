import { TestBed } from '@angular/core/testing';

import { LocalImageConfigService } from './local-image-config.service';

describe('LocalImageConfigService', () => {
  let service: LocalImageConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalImageConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

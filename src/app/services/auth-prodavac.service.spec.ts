import { TestBed } from '@angular/core/testing';

import { AuthProdavacService } from './auth-prodavac.service';

describe('AuthProdavacService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthProdavacService = TestBed.get(AuthProdavacService);
    expect(service).toBeTruthy();
  });
});

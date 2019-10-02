import { TestBed, async, inject } from '@angular/core/testing';

import { PreloalGuard } from './preloal.guard';

describe('PreloalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreloalGuard]
    });
  });

  it('should ...', inject([PreloalGuard], (guard: PreloalGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { TrackProgressService } from './track-progress.service';

describe('TrackProgressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrackProgressService = TestBed.get(TrackProgressService);
    expect(service).toBeTruthy();
  });
});

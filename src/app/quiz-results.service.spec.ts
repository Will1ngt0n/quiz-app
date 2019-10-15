import { TestBed } from '@angular/core/testing';

import { QuizResultsService } from './quiz-results.service';

describe('QuizResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizResultsService = TestBed.get(QuizResultsService);
    expect(service).toBeTruthy();
  });
});

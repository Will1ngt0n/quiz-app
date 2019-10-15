import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResultsScoresPage } from './show-results-scores.page';

describe('ShowResultsScoresPage', () => {
  let component: ShowResultsScoresPage;
  let fixture: ComponentFixture<ShowResultsScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResultsScoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResultsScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

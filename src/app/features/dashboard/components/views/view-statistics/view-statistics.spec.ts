import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatistics } from './view-statistics';

describe('ViewStatistics', () => {
  let component: ViewStatistics;
  let fixture: ComponentFixture<ViewStatistics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStatistics],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewStatistics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

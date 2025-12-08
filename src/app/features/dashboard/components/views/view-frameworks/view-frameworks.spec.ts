import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFrameworks } from './view-frameworks';

describe('ViewFrameworks', () => {
  let component: ViewFrameworks;
  let fixture: ComponentFixture<ViewFrameworks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFrameworks],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFrameworks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

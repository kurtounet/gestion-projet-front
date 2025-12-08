import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSprint } from './view-sprint';

describe('ViewSprint', () => {
  let component: ViewSprint;
  let fixture: ComponentFixture<ViewSprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSprint],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSprint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

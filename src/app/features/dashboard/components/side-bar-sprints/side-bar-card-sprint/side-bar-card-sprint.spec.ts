import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarcardSprint } from './side-bar-card-sprint';

describe('SideBarcardSprint', () => {
  let component: SideBarcardSprint;
  let fixture: ComponentFixture<SideBarcardSprint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarcardSprint],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarcardSprint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDatabase } from './view-database';

describe('ViewDatabase', () => {
  let component: ViewDatabase;
  let fixture: ComponentFixture<ViewDatabase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDatabase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDatabase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

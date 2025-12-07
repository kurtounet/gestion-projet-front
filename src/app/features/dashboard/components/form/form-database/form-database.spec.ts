import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDatabase } from './form-database';

describe('FormDatabase', () => {
  let component: FormDatabase;
  let fixture: ComponentFixture<FormDatabase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDatabase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDatabase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

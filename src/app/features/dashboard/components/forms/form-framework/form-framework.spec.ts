import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFramework } from './form-framework';

describe('FormFramework', () => {
  let component: FormFramework;
  let fixture: ComponentFixture<FormFramework>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFramework],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFramework);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

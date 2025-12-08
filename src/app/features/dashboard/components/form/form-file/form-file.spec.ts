import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFile } from './form-file';

describe('FormFile', () => {
  let component: FormFile;
  let fixture: ComponentFixture<FormFile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFile],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

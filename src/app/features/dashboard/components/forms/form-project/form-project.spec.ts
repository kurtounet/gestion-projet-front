import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProject } from './form-project';

describe('FormProject', () => {
  let component: FormProject;
  let fixture: ComponentFixture<FormProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormProject],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBaseFormComponent } from './code-base-form.component';

describe('CodeBaseFormComponent', () => {
  let component: CodeBaseFormComponent;
  let fixture: ComponentFixture<CodeBaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBaseFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeBaseFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

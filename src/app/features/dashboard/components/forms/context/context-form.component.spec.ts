import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextFormComponent } from './context-form.component';

describe('ContextFormComponent', () => {
  let component: ContextFormComponent;
  let fixture: ComponentFixture<ContextFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

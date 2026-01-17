import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextStatusFormComponent } from './context-status-form.component';

describe('ContextStatusFormComponent', () => {
  let component: ContextStatusFormComponent;
  let fixture: ComponentFixture<ContextStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextStatusFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextStatusFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

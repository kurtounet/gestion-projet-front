import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityFormComponent } from './priority-form.component';

describe('PriorityFormComponent', () => {
  let component: PriorityFormComponent;
  let fixture: ComponentFixture<PriorityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

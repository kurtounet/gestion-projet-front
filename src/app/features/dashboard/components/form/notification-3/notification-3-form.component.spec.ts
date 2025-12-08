import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notification3FormComponent } from './notification-3-form.component';

describe('Notification3FormComponent', () => {
  let component: Notification3FormComponent;
  let fixture: ComponentFixture<Notification3FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Notification3FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Notification3FormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

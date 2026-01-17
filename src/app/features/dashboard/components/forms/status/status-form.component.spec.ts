import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFormComponent } from './status-form.component';

describe('StatusFormComponent', () => {
  let component: StatusFormComponent;
  let fixture: ComponentFixture<StatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

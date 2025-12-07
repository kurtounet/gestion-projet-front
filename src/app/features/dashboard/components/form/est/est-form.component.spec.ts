import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstFormComponent } from './est-form.component';

describe('EstFormComponent', () => {
  let component: EstFormComponent;
  let fixture: ComponentFixture<EstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

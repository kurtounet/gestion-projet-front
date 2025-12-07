import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTaskFormComponent } from './type-task-form.component';

describe('TypeTaskFormComponent', () => {
  let component: TypeTaskFormComponent;
  let fixture: ComponentFixture<TypeTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeTaskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeTaskFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

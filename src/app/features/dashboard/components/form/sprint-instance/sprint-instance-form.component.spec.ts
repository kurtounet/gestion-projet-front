import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintInstanceFormComponent } from './sprint-instance-form.component';

describe('SprintInstanceFormComponent', () => {
  let component: SprintInstanceFormComponent;
  let fixture: ComponentFixture<SprintInstanceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintInstanceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintInstanceFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

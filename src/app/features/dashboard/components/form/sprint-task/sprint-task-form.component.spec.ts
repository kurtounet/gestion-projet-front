import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTaskFormComponent } from './sprint-task-form.component';

describe('SprintTaskFormComponent', () => {
  let component: SprintTaskFormComponent;
  let fixture: ComponentFixture<SprintTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintTaskFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTaskFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

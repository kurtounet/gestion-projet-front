import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTemplateFormComponent } from './sprint-template-form.component';

describe('SprintTemplateFormComponent', () => {
  let component: SprintTemplateFormComponent;
  let fixture: ComponentFixture<SprintTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintTemplateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintTemplateFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

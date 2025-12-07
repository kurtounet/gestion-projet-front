import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGanttComponent } from './view-gantt.component';

describe('ViewGanttComponent', () => {
  let component: ViewGanttComponent;
  let fixture: ComponentFixture<ViewGanttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewGanttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGanttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaskKanbanComponent } from './card-task-kanban.component';

describe('CardTaskKanbanComponent', () => {
  let component: CardTaskKanbanComponent;
  let fixture: ComponentFixture<CardTaskKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTaskKanbanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTaskKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

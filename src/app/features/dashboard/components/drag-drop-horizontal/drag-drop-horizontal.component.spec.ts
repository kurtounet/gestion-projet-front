import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropHorizontalComponent } from './drag-drop-horizontal.component';

describe('DragDropHorizontalComponent', () => {
  let component: DragDropHorizontalComponent;
  let fixture: ComponentFixture<DragDropHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropHorizontalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

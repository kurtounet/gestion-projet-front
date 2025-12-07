import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAddDropdownComponent } from './view-add-dropdown.component';

describe('ViewAddDropdownComponent', () => {
  let component: ViewAddDropdownComponent;
  let fixture: ComponentFixture<ViewAddDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAddDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAddDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

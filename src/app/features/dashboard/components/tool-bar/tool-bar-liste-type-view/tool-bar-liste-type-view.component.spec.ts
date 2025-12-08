import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListeTypeComponent } from './view-liste-type-bar.component';

describe('ViewListeTypeComponent', () => {
  let component: ViewListeTypeComponent;
  let fixture: ComponentFixture<ViewListeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewListeTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewListeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

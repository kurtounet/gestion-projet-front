import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologieFormComponent } from './technologie-form.component';

describe('TechnologieFormComponent', () => {
  let component: TechnologieFormComponent;
  let fixture: ComponentFixture<TechnologieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologieFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologieFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

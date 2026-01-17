import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFormComponent } from './feature-form.component';

describe('FeatureFormComponent', () => {
  let component: FeatureFormComponent;
  let fixture: ComponentFixture<FeatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

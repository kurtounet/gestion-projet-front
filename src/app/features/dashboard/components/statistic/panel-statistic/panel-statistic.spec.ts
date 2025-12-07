import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelStatistic } from './panel-statistic';

describe('PanelStatistic', () => {
  let component: PanelStatistic;
  let fixture: ComponentFixture<PanelStatistic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelStatistic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelStatistic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

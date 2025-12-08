import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarFavorit } from './star-favorit';

describe('StarFavorit', () => {
  let component: StarFavorit;
  let fixture: ComponentFixture<StarFavorit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarFavorit],
    }).compileComponents();

    fixture = TestBed.createComponent(StarFavorit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

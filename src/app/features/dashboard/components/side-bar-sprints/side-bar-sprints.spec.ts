import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarSprints } from './side-bar-sprints';


describe('CardProject', () => {
  let component: SideBarSprints;
  let fixture: ComponentFixture<SideBarSprints>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarSprints]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarSprints);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

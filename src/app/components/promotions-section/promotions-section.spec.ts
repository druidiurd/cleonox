import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsSection } from './promotions-section';

describe('PromotionsSection', () => {
  let component: PromotionsSection;
  let fixture: ComponentFixture<PromotionsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

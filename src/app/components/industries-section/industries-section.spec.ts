import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustriesSection } from './industries-section';

describe('IndustriesSection', () => {
  let component: IndustriesSection;
  let fixture: ComponentFixture<IndustriesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustriesSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustriesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

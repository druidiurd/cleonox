import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetySection } from './safety-section';

describe('SafetySection', () => {
  let component: SafetySection;
  let fixture: ComponentFixture<SafetySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafetySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

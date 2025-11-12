import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCeiling } from './high-ceiling';

describe('HighCeiling', () => {
  let component: HighCeiling;
  let fixture: ComponentFixture<HighCeiling>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighCeiling]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighCeiling);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

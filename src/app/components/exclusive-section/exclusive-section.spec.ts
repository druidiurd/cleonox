import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusiveSection } from './exclusive-section';

describe('ExclusiveSection', () => {
  let component: ExclusiveSection;
  let fixture: ComponentFixture<ExclusiveSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExclusiveSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExclusiveSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

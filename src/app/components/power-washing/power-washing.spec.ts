import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerWashing } from './power-washing';

describe('PowerWashing', () => {
  let component: PowerWashing;
  let fixture: ComponentFixture<PowerWashing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PowerWashing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerWashing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

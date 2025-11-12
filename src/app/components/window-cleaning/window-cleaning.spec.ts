import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowCleaning } from './window-cleaning';

describe('WindowCleaning', () => {
  let component: WindowCleaning;
  let fixture: ComponentFixture<WindowCleaning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WindowCleaning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WindowCleaning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

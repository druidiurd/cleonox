import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercialResidential } from './commercial-residential';

describe('CommercialResidential', () => {
  let component: CommercialResidential;
  let fixture: ComponentFixture<CommercialResidential>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommercialResidential]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommercialResidential);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

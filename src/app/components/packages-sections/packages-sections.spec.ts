import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesSections } from './packages-sections';

describe('PackagesSections', () => {
  let component: PackagesSections;
  let fixture: ComponentFixture<PackagesSections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesSections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagesSections);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredFacilityComponent } from './registered-facility.component';

describe('RegisteredFacilityComponent', () => {
  let component: RegisteredFacilityComponent;
  let fixture: ComponentFixture<RegisteredFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

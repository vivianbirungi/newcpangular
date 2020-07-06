import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveFacilityComponent } from './approve-facility.component';

describe('ApproveFacilityComponent', () => {
  let component: ApproveFacilityComponent;
  let fixture: ComponentFixture<ApproveFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

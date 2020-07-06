import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFacilityComponent } from './single-facility.component';

describe('SingleFacilityComponent', () => {
  let component: SingleFacilityComponent;
  let fixture: ComponentFixture<SingleFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

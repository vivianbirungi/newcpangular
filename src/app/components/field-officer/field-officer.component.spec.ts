import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldOfficerComponent } from './field-officer.component';

describe('FieldOfficerComponent', () => {
  let component: FieldOfficerComponent;
  let fixture: ComponentFixture<FieldOfficerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldOfficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

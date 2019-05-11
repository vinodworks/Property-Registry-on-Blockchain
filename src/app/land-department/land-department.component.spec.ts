import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandDepartmentComponent } from './land-department.component';

describe('LandDepartmentComponent', () => {
  let component: LandDepartmentComponent;
  let fixture: ComponentFixture<LandDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

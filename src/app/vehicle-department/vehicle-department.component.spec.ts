import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleDepartmentComponent } from './vehicle-department.component';

describe('VehicleDepartmentComponent', () => {
  let component: VehicleDepartmentComponent;
  let fixture: ComponentFixture<VehicleDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

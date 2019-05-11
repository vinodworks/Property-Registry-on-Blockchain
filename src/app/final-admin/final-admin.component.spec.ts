import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalAdminComponent } from './final-admin.component';

describe('FinalAdminComponent', () => {
  let component: FinalAdminComponent;
  let fixture: ComponentFixture<FinalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

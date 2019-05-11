import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCreateUserComponent } from './final-create-user.component';

describe('FinalCreateUserComponent', () => {
  let component: FinalCreateUserComponent;
  let fixture: ComponentFixture<FinalCreateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalCreateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

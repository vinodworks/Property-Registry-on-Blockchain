import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSearchUserComponent } from './final-search-user.component';

describe('FinalSearchUserComponent', () => {
  let component: FinalSearchUserComponent;
  let fixture: ComponentFixture<FinalSearchUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalSearchUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSearchUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalHomeComponent } from './final-home.component';

describe('FinalHomeComponent', () => {
  let component: FinalHomeComponent;
  let fixture: ComponentFixture<FinalHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

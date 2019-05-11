import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMainComponent } from './final-main.component';

describe('FinalMainComponent', () => {
  let component: FinalMainComponent;
  let fixture: ComponentFixture<FinalMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

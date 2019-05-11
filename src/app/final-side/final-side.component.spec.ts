import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSideComponent } from './final-side.component';

describe('FinalSideComponent', () => {
  let component: FinalSideComponent;
  let fixture: ComponentFixture<FinalSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

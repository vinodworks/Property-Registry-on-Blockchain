import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSuadminComponent } from './final-suadmin.component';

describe('FinalSuadminComponent', () => {
  let component: FinalSuadminComponent;
  let fixture: ComponentFixture<FinalSuadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalSuadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalSuadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

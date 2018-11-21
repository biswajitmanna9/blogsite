import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackdetailsComponent } from './cashbackdetails.component';

describe('CashbackdetailsComponent', () => {
  let component: CashbackdetailsComponent;
  let fixture: ComponentFixture<CashbackdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashbackdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbackdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

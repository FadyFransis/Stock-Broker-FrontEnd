import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangeCurrenciesComponent } from './mange-currencies.component';

describe('MangeCurrenciesComponent', () => {
  let component: MangeCurrenciesComponent;
  let fixture: ComponentFixture<MangeCurrenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangeCurrenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangeCurrenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersFormComponent } from './vouchers-form.component';

describe('VouchersFormComponent', () => {
  let component: VouchersFormComponent;
  let fixture: ComponentFixture<VouchersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

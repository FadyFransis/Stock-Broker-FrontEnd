import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsFormComponent } from './brands-form.component';

describe('BrandsFormComponent', () => {
  let component: BrandsFormComponent;
  let fixture: ComponentFixture<BrandsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationsFormComponent } from './nations-form.component';

describe('NationsFormComponent', () => {
  let component: NationsFormComponent;
  let fixture: ComponentFixture<NationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

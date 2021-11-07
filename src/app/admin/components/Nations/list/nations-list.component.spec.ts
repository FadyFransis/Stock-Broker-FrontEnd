import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationsListComponent } from './nations-list.component';

describe('NationsListComponent', () => {
  let component: NationsListComponent;
  let fixture: ComponentFixture<NationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

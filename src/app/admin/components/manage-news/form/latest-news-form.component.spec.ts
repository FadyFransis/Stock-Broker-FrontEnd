import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsFormComponent } from './latest-news-form.component';

describe('LatestNewsFormComponent', () => {
  let component: LatestNewsFormComponent;
  let fixture: ComponentFixture<LatestNewsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

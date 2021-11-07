import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestNewsListComponent } from './latest-news-list.component';

describe('LatestNewsListComponent', () => {
  let component: LatestNewsListComponent;
  let fixture: ComponentFixture<LatestNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

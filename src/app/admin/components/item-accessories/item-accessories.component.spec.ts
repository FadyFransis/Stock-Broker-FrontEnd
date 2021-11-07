import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAccessoriesComponent } from './item-accessories.component';

describe('ItemAccessoriesComponent', () => {
  let component: ItemAccessoriesComponent;
  let fixture: ComponentFixture<ItemAccessoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemAccessoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

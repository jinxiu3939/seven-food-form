import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InComponentComponent } from './in-component.component';

describe('InComponentComponent', () => {
  let component: InComponentComponent;
  let fixture: ComponentFixture<InComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

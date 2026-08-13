import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayScalesComponent } from './display-scales';

describe('DisplayScalesComponent', () => {
  let component: DisplayScalesComponent;
  let fixture: ComponentFixture<DisplayScalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayScalesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayScalesComponent);
    component = fixture.componentInstance;
    component.scaleSizes = [1];
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveComposition } from './directive-composition';

describe('DirectiveComposition', () => {
  let component: DirectiveComposition;
  let fixture: ComponentFixture<DirectiveComposition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectiveComposition],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectiveComposition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

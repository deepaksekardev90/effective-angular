import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSlotsComponent } from './content-slots';

describe('ContentSlotsComponent', () => {
  let component: ContentSlotsComponent;
  let fixture: ComponentFixture<ContentSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSlotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentSlotsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

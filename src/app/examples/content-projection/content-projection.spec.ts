import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentProjectionComponent } from './content-projection';

describe('ContentProjectionComponent', () => {
  let component: ContentProjectionComponent;
  let fixture: ComponentFixture<ContentProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentProjectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentProjectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

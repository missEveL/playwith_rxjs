import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffirmationListComponent } from './affirmation-list.component';

describe('AffirmationListComponent', () => {
  let component: AffirmationListComponent;
  let fixture: ComponentFixture<AffirmationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffirmationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffirmationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

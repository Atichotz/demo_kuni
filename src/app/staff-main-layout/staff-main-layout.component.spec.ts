import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMainLayoutComponent } from './staff-main-layout.component';

describe('StaffMainLayoutComponent', () => {
  let component: StaffMainLayoutComponent;
  let fixture: ComponentFixture<StaffMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffMainLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

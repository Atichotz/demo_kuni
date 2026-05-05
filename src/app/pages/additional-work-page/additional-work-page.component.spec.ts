import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalWorkPageComponent } from './additional-work-page.component';

describe('AdditionalWorkPageComponent', () => {
  let component: AdditionalWorkPageComponent;
  let fixture: ComponentFixture<AdditionalWorkPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalWorkPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalWorkPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

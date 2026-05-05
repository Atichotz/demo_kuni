import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryGuideComponent } from './battery-guide.component';

describe('BatteryGuideComponent', () => {
  let component: BatteryGuideComponent;
  let fixture: ComponentFixture<BatteryGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

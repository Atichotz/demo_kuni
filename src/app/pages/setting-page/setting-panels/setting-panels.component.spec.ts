import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPanelsComponent } from './setting-panels.component';

describe('SettingPanelsComponent', () => {
  let component: SettingPanelsComponent;
  let fixture: ComponentFixture<SettingPanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingPanelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

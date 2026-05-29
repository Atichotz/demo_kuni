import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBatteriesComponent } from './setting-batteries.component';

describe('SettingBatteriesComponent', () => {
  let component: SettingBatteriesComponent;
  let fixture: ComponentFixture<SettingBatteriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingBatteriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBatteriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

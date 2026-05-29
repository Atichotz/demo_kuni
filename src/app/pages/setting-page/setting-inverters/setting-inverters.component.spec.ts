import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInvertersComponent } from './setting-inverters.component';

describe('SettingInvertersComponent', () => {
  let component: SettingInvertersComponent;
  let fixture: ComponentFixture<SettingInvertersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingInvertersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingInvertersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingProductsComponent } from './setting-products.component';

describe('SettingProductsComponent', () => {
  let component: SettingProductsComponent;
  let fixture: ComponentFixture<SettingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

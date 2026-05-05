import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KLoadingComponent } from './k-loading.component';

describe('KLoadingComponent', () => {
  let component: KLoadingComponent;
  let fixture: ComponentFixture<KLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KLoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

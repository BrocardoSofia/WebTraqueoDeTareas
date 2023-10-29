import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfpomoComponent } from './confpomo.component';

describe('ConfpomoComponent', () => {
  let component: ConfpomoComponent;
  let fixture: ComponentFixture<ConfpomoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfpomoComponent]
    });
    fixture = TestBed.createComponent(ConfpomoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

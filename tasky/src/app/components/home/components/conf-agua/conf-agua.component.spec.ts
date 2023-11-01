import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfAguaComponent } from './conf-agua.component';

describe('ConfAguaComponent', () => {
  let component: ConfAguaComponent;
  let fixture: ComponentFixture<ConfAguaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfAguaComponent]
    });
    fixture = TestBed.createComponent(ConfAguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

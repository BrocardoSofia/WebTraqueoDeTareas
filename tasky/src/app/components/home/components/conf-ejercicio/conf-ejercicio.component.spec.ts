import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfEjercicioComponent } from './conf-ejercicio.component';

describe('ConfEjercicioComponent', () => {
  let component: ConfEjercicioComponent;
  let fixture: ComponentFixture<ConfEjercicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfEjercicioComponent]
    });
    fixture = TestBed.createComponent(ConfEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

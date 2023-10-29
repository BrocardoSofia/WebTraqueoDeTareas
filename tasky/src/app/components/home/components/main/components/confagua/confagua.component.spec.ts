import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfaguaComponent } from './confagua.component';

describe('ConfaguaComponent', () => {
  let component: ConfaguaComponent;
  let fixture: ComponentFixture<ConfaguaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfaguaComponent]
    });
    fixture = TestBed.createComponent(ConfaguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTaskyComponent } from './about-tasky.component';

describe('AboutTaskyComponent', () => {
  let component: AboutTaskyComponent;
  let fixture: ComponentFixture<AboutTaskyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutTaskyComponent]
    });
    fixture = TestBed.createComponent(AboutTaskyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfPomodoroComponent } from './conf-pomodoro.component';

describe('ConfPomodoroComponent', () => {
  let component: ConfPomodoroComponent;
  let fixture: ComponentFixture<ConfPomodoroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfPomodoroComponent]
    });
    fixture = TestBed.createComponent(ConfPomodoroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

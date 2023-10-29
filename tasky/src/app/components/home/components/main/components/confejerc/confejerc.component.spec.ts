import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfejercComponent } from './confejerc.component';

describe('ConfejercComponent', () => {
  let component: ConfejercComponent;
  let fixture: ComponentFixture<ConfejercComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfejercComponent]
    });
    fixture = TestBed.createComponent(ConfejercComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

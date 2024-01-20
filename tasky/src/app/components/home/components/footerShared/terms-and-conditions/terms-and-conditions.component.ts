import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit{
  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}

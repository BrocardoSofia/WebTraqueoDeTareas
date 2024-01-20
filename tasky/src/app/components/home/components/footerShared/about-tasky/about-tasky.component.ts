import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-about-tasky',
  templateUrl: './about-tasky.component.html',
  styleUrls: ['./about-tasky.component.css']
})
export class AboutTaskyComponent implements OnInit{
  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}

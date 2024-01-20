import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  constructor(private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}

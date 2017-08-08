import {Component, HostListener, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOutSideClicked: boolean;
  elementRef: ElementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }


  ngOnInit() {
    this.isOutSideClicked = false;
  }

  isListVisible(value){
    this.isOutSideClicked = !value;
  }
  @HostListener('click', ['$event'])

  handleClick(event) {
    this.isOutSideClicked = true;

  }
}

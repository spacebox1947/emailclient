import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // append modal to child
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    // remove modal when navigating away
    this.el.nativeElement.remove();
  }

  dismissModal() {
    // send an event so stuff knows modal exists
    this.dismiss.emit();
  }
}
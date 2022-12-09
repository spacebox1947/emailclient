import { Component, OnInit, Input } from '@angular/core';
import { FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control: FormControl | any;
  @Input() inputType: string = ''; // empty string or password

  constructor() { }

  ngOnInit(): void {
    /* if (!this.control.get('username') ||
    !(this.control.get('username') instanceof FormControl)) {
      this.control.addControl('username', new FormControl());
    } */
  }

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  emailForm!: FormGroup;
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    const { subject, from, to, text } = this.email;
    this.emailForm = new FormGroup({
      to: new FormControl(to, [
        Validators.required,
        Validators.email
      ]),
      from: new FormControl({
        value: from,
        disabled: true
      }, []),
      subject: new FormControl(subject, [
        Validators.required
      ]),
      text: new FormControl(text, [
        Validators.required
      ])
    })
  }

  onSubmit() {
    if (this.emailForm.invalid) {
      return ;
    }
    // because from is disabled in the FormControl, it is not passed with .value
    // console.log(this.emailForm.getRawValue()) will send disabledi info, too
    //console.log(this.emailForm.value);
    this.emailSubmit.emit(this.emailForm.value);
  }
}
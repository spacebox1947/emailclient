import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, SignInCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    // actually signe up correctly
    this.authService.signIn(this.authForm.value as SignInCredentials).subscribe({
      next: (response) => {
        // manually navigate to inbox
        this.router.navigateByUrl('/inbox');
      },
      error: ({ error }) => {
        //console.log(err);
        // send an error for either failure case
        if (error.username || error.password) {
          this.authForm.setErrors({ credentials: true });
        }
        else if (!error.status) {
          this.authForm.setErrors({ noConnection: true })
        }
      }
    })
  }
}

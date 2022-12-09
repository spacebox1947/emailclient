import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AsyncValidatorFn } from '@angular/forms';
import { Validators, ValidatorFn } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService, SignUpCredentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [
      this.uniqueUsername.validate as AsyncValidatorFn
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  },
  { validators: [this.matchPassword.validate as ValidatorFn] }
  );


  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    // send valid form to auth service
    this.authService.signUp(this.authForm.value as SignUpCredentials).subscribe( {
      // call when theres a new value
      next: (response) => {
        // manually navigate to inbox
        this.router.navigateByUrl('/inbox');
      },
      // oops!
      error: (err) => {
        //console.log(err);
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true })
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

}

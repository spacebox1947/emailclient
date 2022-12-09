import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.signOut().subscribe( () => {
      // do something when user signed out
      // navigate to sign in
      // or navigate to another component
      this.router.navigateByUrl('/');
    });
  }

}

import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
//import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedIn: boolean = false;
  //signedIn$ = new BehaviorSubject<boolean>(false);
  

  constructor(private authService: AuthService) {
    //this.signedIn$ = this.authService.signedIn$;
  }

  ngOnInit() {
    this.authService.signedIn$.subscribe(signedIn => {
      this.signedIn = signedIn;
    });
    // check if a returning/refreshing user is logged in already
    this.authService.checkAuthStatus().subscribe(() => {});
  }
}

/*
* Uncommented conde replaces boolean, ngOnInit declarations and allows you to type logic in the TEMPLATE
*/
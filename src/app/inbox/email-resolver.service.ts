import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Email } from './email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs';
import { EMPTY } from 'rxjs';
import { identifierName } from '@angular/compiler';

/*
* Resolvers use a resolve method,
* and is expected to return the TYPE, Observable<TYPE>
* Provides a layer between an undefined Email in email-show and the html
*/
@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {
  rootUrl = 'https://api.angular-email.com';


  // route: lots of information about current route
  constructor(private emailService: EmailService, private router: Router) { }
  

  resolve(route: ActivatedRouteSnapshot) {
    //console.log(route);
    // route contains our email id in params!
    const { id } = route.params;
    // get an Observable <Email> from EmailService, send to EmailShowComp
    //console.log(this.emailService.getEmailById(id));
    return this.emailService.getEmailById(id).pipe(
      catchError((err) => {
        //console.log(err);
        this.router.navigateByUrl('/inbox/not-found');
        //this.router.navigateByUrl(`${this.rootUrl}/not-found`);
        // rxjs expects an observable returned from resolve,
        // soo.... send an EMPTY observable
        return EMPTY;
      })
    ); 
  }
}

/*
* CURRENTLY does not send user to /not-found/ but boots user to the root url.
* Why? vids 399-341--ish (Resovler and Error Handling)
*/
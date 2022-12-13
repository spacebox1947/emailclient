import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Email } from './email';

/*
* Resolvers use a resolve method,
* and is expected to return the TYPE, Observable<TYPE>
* Provides a layer between an undefined Email in email-show and the html
*/
@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor() { }

  resolve() {

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
* Auth service makes a request ot the api-angular webservice
* Hands it off to the validator.
*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>('https://api.angular-email.com/auth/username', {
      username
    });
  }
}

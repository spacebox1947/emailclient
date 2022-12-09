import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'

/*
* Auth service makes a request ot the api-angular webservice
* Hands it off to the validator.
*/

// build some interfaces to describe data flowing around the service
// other parts of the app will now know what that object type contains
interface UsernameAvalableResponse {
  available: boolean;
}

export interface SignUpCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInCredentials {
  username: string;
  password: string;
}

interface SignUpResponse {
  username: string;
}

interface SignInResponse {
  username: string;
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl: string = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvalableResponse>(
      this.rootUrl+'/auth/username', {username});
  }

  signUp(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(
      this.rootUrl+'/auth/signup', credentials).pipe(
        // any errors will skip tap()
        tap(() => {
          this.signedIn$.next(true);
        }
      )
    );
  }

  signIn(credentials: SignInCredentials) {
    return this.http.post<SignInResponse>(
      this.rootUrl+'/auth/signin', credentials).pipe(
        // any errors will skip tap()
        tap(() => {
          this.signedIn$.next(true);
        }
      )
    );
  }

  checkAuthStatus() {
    return this.http.get<SignedInResponse>(
      this.rootUrl+'/auth/signedin').pipe(
        tap(({ authenticated }) => {
          this.signedIn$.next(authenticated)
        }
      )
    );
  }

  signOut() {
    return this.http.post(
      this.rootUrl+'/auth/signout', {}
    ).pipe(
      tap(() => {
        this.signedIn$.next(false);
      })
    )
  }
}
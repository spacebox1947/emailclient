import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms"
import { map, catchError, of } from 'rxjs'

import { AuthService } from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {
    constructor(private authService: AuthService) {}

    validate = (control: FormControl) => {
        const { value } = control;

        return this.authService.usernameAvailable(value).pipe(
            // errors from network requests will skip a map object
            map((value) => {
                // we expect a non error on successful username,
                // so the if is not necessary.
                //if (value.available) { return null; }
                    return null;
            }),
            catchError((err) => {
                //console.log(err);
                // additional logic could be added here to differentiate btwn
                // username: true and networkRequest: failed
                // and even other errors
                if (err.error.username) {
                    return of({ nonUniqueUsername: true })
                } else {
                    return of({ noConnection: true })
                }
            })
        )
    }
}
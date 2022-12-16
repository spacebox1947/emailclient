import { Injectable } from '@angular/core'
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgIfContext } from '@angular/common';
import { tap } from 'rxjs';

@Injectable() // httpInterceptor requires different injectable syntax
export class AuthHttpInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //console.log(req);
        // properties on a request are read only, so make a clone
        const modifiedReq = req.clone({
            withCredentials: true
            //url: ,
            //headers: ,
        });
        return next.handle(modifiedReq);//.pipe(
            // this method is fine if only checking for one event
            //filter(val => val.type ===HttpEventType.Sent),
            // ---------
            // this set up is great when expecting lots of events
            /* tap(val => {
                // a response is sent to the server
                if (val.type === HttpEventType.Sent) {
                    console.log('Request was sent to server');
                }
                // a response has returned from the server
                if (val.type === HttpEventType.Response) {
                    console.log('Got a response from the API', val);
                }
            }) */
        //);
    }
}
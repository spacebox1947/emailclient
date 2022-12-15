import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email!: Email;

  constructor(private route: ActivatedRoute) { 
      // component WILL NOT show until some stuff comes back
      //console.log(this.route.snapshot.data);//get snapshot from router-resolver
      // get immediate data from snapshot INCASE comp loads before observable response
      this.email = this.route.snapshot.data['email']; 
      // get updatable data from observer
      // destructure router.data to get email
      this.route.data.subscribe(({ email }) => {
        //console.log(data); // show the email baby
        this.email = email;
      });
    }

  /*
    Activated route can return information ... there are two things to interract with:
      - BehaviorSubjects (observable) 
        -- emits a value whenever some part of the URL changes
        -- when :id changes, my observable updates
        -- updates ANY time the route changes with a new view of the same compnent
            e.g. route to a new email
      - Snapshot (object) 
        -- simple+straighforward description of URL right now
        -- do not need to subscribe to get URL :id
        -- instantaneous
        -- bad if we navigate to a new view of the same component, e.g. a new email
              will not update to the NEW route
  */

  ngOnInit(): void {
    // ---- ---- snapshot version ---- ----
    // parse part of the ActivateRouteSnapshot info
    //console.log(this.route.snapshot);
    //this.route.params.subscribe((snapshot) => {console.log(snapshot)})

    // ---- ---- observable version ---- ----
    // the bad way pull id out of snapshot
    /*
    this.route.params.subscribe(({ id }) => {
      //console.log(id);
      this.emailService.getEmailById(id).subscribe(email => {
        console.log(email);
      })
    })
    */

    /* // the goodway with switchMap
    this.route.params.pipe(
      // destructure id out of params
      switchMap(({ id }) => {
        return this.emailService.getEmailById(id);
      })
    // get the email observable
    ).subscribe((email) => {
      //console.log(email);
      this.email = email;
    }) */

    // resolver from route Object
    
  }

}

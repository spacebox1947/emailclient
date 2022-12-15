import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('You made it!');
  }

}

/*
*
* REROUTING TO THIS COMPONENT DOES NOT WORK ....
*   WHY?
*
*/
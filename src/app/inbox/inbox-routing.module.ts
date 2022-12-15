import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailShowComponent } from './email-show/email-show.component';
import { InboxHomeComponent } from './inbox-home/inbox-home.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { EmailResolverService } from './email-resolver.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: InboxHomeComponent,
    children: [
      // app will not redirect to 'not-found' component, rather boots to root dir
      // must be something I did incorrectly somewhere.
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      // show EmailShow when there is any strin concat on the root (as id)
      // : acts as a wild card (kinda)
      // ALSO, that is the name of the param for the ActiveRoute
      { path: ':id',
        component: EmailShowComponent,
        resolve: {
          email: EmailResolverService // data 'email' comes from EmailResolverService
        }
      },
      // show Placeholder on root route of inbox
      { path: '', component: PlaceholderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }

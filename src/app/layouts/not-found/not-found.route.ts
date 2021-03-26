import { Routes } from '@angular/router';
import { APP_NAME } from 'src/app/app.constants';
import { NotFoundComponent } from './not-found.component';

export const notFoundRoute: Routes = [
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      pageTitle: `${APP_NAME} - 404`
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

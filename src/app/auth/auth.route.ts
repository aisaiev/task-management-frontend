import { Routes } from '@angular/router';
import { APP_NAME } from '../app.constants';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

export const authRoute: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    data: {
      pageTitle: `${APP_NAME} - Sign In`
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      pageTitle: `${APP_NAME} - Sign Up`
    }
  }
];

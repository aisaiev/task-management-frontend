import { Routes } from '@angular/router';
import { APP_NAME } from '../app.constants';
import { TaskComponent } from './task.component';

export const taskRoute: Routes = [
  {
    path: 'tasks',
    component: TaskComponent,
    data: {
      pageTitle: `${APP_NAME} - Tasks`
    }
  }
];

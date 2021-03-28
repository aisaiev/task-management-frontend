import { Routes } from '@angular/router';
import { APP_NAME } from '../app.constants';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskComponent } from './task.component';

export const taskRoute: Routes = [
  {
    path: 'tasks',
    component: TaskComponent,
    data: {
      pageTitle: `${APP_NAME} - Tasks`
    }
  },
  {
    path: 'tasks/create',
    component: CreateTaskComponent,
    data: {
      pageTitle: `${APP_NAME} - Create Task`
    }
  }
];

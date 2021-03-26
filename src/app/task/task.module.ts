import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { RouterModule } from '@angular/router';
import { taskRoute } from './task.route';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(taskRoute)
  ]
})
export class TaskModule { }

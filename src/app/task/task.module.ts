import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './task.component';
import { taskRoute } from './task.route';
import { plus, trash, boxArrowInRight, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { CreateTaskComponent } from './create-task/create-task.component';

const icons = {
  plus,
  trash,
  boxArrowInRight
};

@NgModule({
  declarations: [TaskComponent, CreateTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(taskRoute),
    NgxBootstrapIconsModule.pick(icons)
  ]
})
export class TaskModule { }

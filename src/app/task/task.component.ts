import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './enum/task-status.enum';
import { Task } from './models/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  taskStatusEnum: typeof TaskStatus = TaskStatus;
  search = new FormControl('');
  statusFilter = new FormControl('');
  subscriptions: Subscription[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getTasks();

    const searchSubscription = this.search.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(() => this.getTasks());
    this.subscriptions.push(searchSubscription);

    const statusFilterSubscription =  this.statusFilter.valueChanges.subscribe(() => this.getTasks());
    this.subscriptions.push(statusFilterSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getTasks(): void {
    const filterDto: GetTasksFilterDto = {
      search: this.search.value,
      status: this.statusFilter.value
    };
    const subscription = this.taskService.getTasks(filterDto).subscribe(tasks => {
      this.tasks = tasks;
    });
    this.subscriptions.push(subscription);
  }

  taskStatusChange(task: Task): void {
    const { id, status } = task;
    const subscription = this.taskService.updateTaskStatus(id, status).subscribe();
    this.subscriptions.push(subscription);
  }

  deleteTask(id: number): void {
    const idx = this.tasks.findIndex(task => task.id === id);
    const subscription = this.taskService.deleteTask(id).subscribe(() => {
      this.tasks.splice(idx, 1);
    });
    this.subscriptions.push(subscription);
  }

  logout(): void {
    this.authService.logout();
  }
}

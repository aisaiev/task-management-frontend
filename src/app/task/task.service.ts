import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationSeverity } from '../shared/notification/models/notification.model';
import { NotificationService } from '../shared/notification/notification.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './enum/task-status.enum';
import { Task } from './models/task.model';
import { StatusCodes } from 'http-status-codes';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.apiUrl + '/tasks';

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  getTasks(filterDto: GetTasksFilterDto): Observable<Task[]> {
    const query = Object.keys(filterDto)
      .map(key => filterDto[key] ? `${key}=${filterDto[key]}` : null)
      .filter(value => value)
      .join('&');
    const url = query ? `${this.url}?${query}` : this.url;
    return this.httpClient.get<Task[]>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== StatusCodes.UNAUTHORIZED) {
            this.notificationService.show({
              header: 'Tasks Notification',
              body: 'Unable to retrieve tasks',
              severity: NotificationSeverity.DANGER,
              delay: 10000
            })
          }
          return EMPTY;
        })
      );
  }

  createTask(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.httpClient.post<Task>(this.url, createTaskDto)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== StatusCodes.UNAUTHORIZED) {
            this.notificationService.show({
              header: 'Tasks Notification',
              body: 'Unable to create task',
              severity: NotificationSeverity.DANGER,
              delay: 10000
            })
          }
          return EMPTY;
        })
      );
  }

  updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
    const body = { status };
    return this.httpClient.patch<Task>(`${this.url}/${id}/status`, body)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== StatusCodes.UNAUTHORIZED) {
            this.notificationService.show({
              header: 'Tasks Notification',
              body: 'Unable to update task status',
              severity: NotificationSeverity.DANGER,
              delay: 10000
            })
          }
          return EMPTY;
        })
      );
  }

  deleteTask(id: number): Observable<object> {
    return this.httpClient.delete(`${this.url}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== StatusCodes.UNAUTHORIZED) {
            this.notificationService.show({
              header: 'Tasks Notification',
              body: `Unable to delete task ID ${id}`,
              severity: NotificationSeverity.DANGER,
              delay: 10000
            })
          }
          return EMPTY;
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './enum/task-status.enum';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = environment.apiUrl + '/tasks';

  constructor(
    private httpClient: HttpClient
  ) { }

  getTasks(filterDto: GetTasksFilterDto): Observable<Task[]> {
    const query = Object.keys(filterDto)
      .map(key => filterDto[key] ? `${key}=${filterDto[key]}` : null)
      .filter(value => value)
      .join('&');
    const url = query ? `${this.url}?${query}` : this.url;
    return this.httpClient.get<Task[]>(url);
  }

  createTask(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.httpClient.post<Task>(this.url, createTaskDto);
  }

  updateTaskStatus(id: number, status: TaskStatus): Observable<Task> {
    const body = { status };
    return this.httpClient.patch<Task>(`${this.url}/${id}/status`, body);
  }

  deleteTask(id: number): Observable<object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}

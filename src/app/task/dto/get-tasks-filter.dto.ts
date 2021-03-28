import { TaskStatus } from '../enum/task-status.enum';

export interface GetTasksFilterDto {
  status: TaskStatus;
  search: string;
}

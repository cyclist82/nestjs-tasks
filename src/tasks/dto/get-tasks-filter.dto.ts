import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus, taskStatuses } from '../task-status.model';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn(taskStatuses)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus, taskStatuses } from '../task.model';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn(taskStatuses)
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
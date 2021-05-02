import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks({ status, search }: GetTasksFilterDTO): Task[] {
    return this.tasks
      .filter(task => status ? task.status === status : true)
      .filter(({ title, description }) => search ? title.includes(search) || description.includes(search) : true);
  }

  createTask(unsavedTask: CreateTaskDTO): Task {
    const task: Task = {
      id: uuid(),
      ...unsavedTask,
      status: 'OPEN',
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(taskId: string): Task {
    const task = this.tasks.find(({ id }) => id === taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} doesn't exist.`);
    }
    return task;
  }

  deleteTask(taskId: string): void {
    const task = this.getTaskById(taskId);
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }

  updateTaskStatus(taskId: string, status: TaskStatus): Task {
    const updatedTask = { ...this.getTaskById(taskId), status };
    this.tasks = this.tasks.map(task => task.id === taskId ? updatedTask : task);
    return updatedTask;
  }
}

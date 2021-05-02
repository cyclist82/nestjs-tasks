import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { taskStatuses } from '../task.model';

@Injectable()
export class TaskStatusValdationPipe implements PipeTransform {

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`'${value}' is an invalid status. You can provide ${this.allowedStatusesText}.`);
    }

    return value;
  }

  private isValidStatus(value: any): boolean {
    return taskStatuses.includes(value);
  }

  private get allowedStatusesText(): string {
    return taskStatuses.reduce((combined, current, index, array) => `${combined}'${current}'${index + 1 < array.length ? ', ' : ''}`, '');
  }
}

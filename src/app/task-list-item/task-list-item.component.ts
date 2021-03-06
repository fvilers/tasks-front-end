import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent {
  @Input()
  task: Task;

  @Output()
  edit = new EventEmitter();

  @Output()
  remove = new EventEmitter();

  editTask() {
    this.edit.emit();
  }

  removeTask() {
    this.remove.emit();
  }
}

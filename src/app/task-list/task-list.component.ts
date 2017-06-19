import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { TaskService } from '../task.service';
import { Task } from '../task';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<Task[]>;

  constructor(private taskService: TaskService, private dialog: MdDialog) {
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.taskService.find();
  }

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(EditTaskComponent);
    const closedSub = dialogRef.afterClosed().subscribe(task => {
      if (task) {
        this.taskService.create(task)
          .then(() => this.loadTasks())
        ;
      }
      
      closedSub.unsubscribe();
    });
  }

  openEditTaskDialog(task: Task) {
    const data = { task: Object.assign({}, task) };
    const dialogRef = this.dialog.open(EditTaskComponent, { data });
    const closedSub = dialogRef.afterClosed().subscribe(task => {
      if (task) {
        this.taskService.update(task)
          .then(() => this.loadTasks())
        ;
      }
      
      closedSub.unsubscribe();
    });
  }
}

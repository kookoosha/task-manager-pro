import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> = this.taskService.getTasks();
  todoTasks$: Observable<Task[]> = new Observable<Task[]>();
  inProgressTasks$: Observable<Task[]> = new Observable<Task[]>();
  doneTasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Фильтрация задач по статусу
    this.todoTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'todo'))
    );
    this.inProgressTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'in-progress'))
    );
    this.doneTasks$ = this.tasks$.pipe(
      map(tasks => tasks.filter(task => task.status === 'done'))
    );
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'low':
        return '#4caf50'; // Зеленый
      case 'medium':
        return '#ff9800'; // Оранжевый
      case 'high':
        return '#f44336'; // Красный
      default:
        return '#3f51b5'; // Синий по умолчанию
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private nextId = 1;

  constructor() {}

  // Получить все задачи
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // Добавить задачу
  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = { id: this.nextId++, ...task };
    this.tasksSubject.next([...this.tasksSubject.getValue(), newTask]);
  }

  // Удалить задачу
  deleteTask(id: number): void {
    const updatedTasks = this.tasksSubject
      .getValue()
      .filter(task => task.id !== id);
    this.tasksSubject.next(updatedTasks);
  }

  // Обновить задачу
  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    tasks[index] = updatedTask;
    this.tasksSubject.next([...tasks]);
  }
}

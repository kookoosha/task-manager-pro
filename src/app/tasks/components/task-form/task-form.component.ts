import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['low', Validators.required],
      status: ['todo', Validators.required],
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);

      // Сбрасываем форму с дефолтными значениями
      this.taskForm.reset({
        title: '',
        description: '',
        priority: 'low',
        status: 'todo',
      });

      // Сбрасываем состояния всех полей
      Object.keys(this.taskForm.controls).forEach((key) => {
        const control = this.taskForm.get(key);
        if (control) {
          control.setErrors(null); // Убираем все ошибки
          control.markAsPristine(); // Сбрасываем состояние
          control.markAsUntouched(); // Убираем фокус
        }
      });
    }
  }


}

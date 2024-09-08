import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskService } from '../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; 

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, MatCardModule, MatListModule, MatIcon, MatFormField, MatSelect, MatOption, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = []; 
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}
  
  ngOnInit() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }

  editTask(task: Task) {
    this.editingTask = { ...task }; // Clone the task for editing
  }

  saveTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe(() => {
        this.tasks = this.tasks.map(t => t.id === this.editingTask!.id ? this.editingTask! : t);
        this.editingTask = null; // Clear editing state
      });
    }
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}

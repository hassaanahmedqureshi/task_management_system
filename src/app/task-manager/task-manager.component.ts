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
import { MatLabel } from '@angular/material/form-field';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, MatCardModule,
     MatListModule, MatIcon, MatFormField, MatSelect, MatOption, FormsModule, MatLabel],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = []; 
  editingTask: Task | null = null;
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  sortOption: string = 'title';

  constructor(private taskService: TaskService) {}
  
  ngOnInit() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortTasks();
  }

  sortTasks() {
    this.filteredTasks.sort((a, b) => {
      if (this.sortOption === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return a.status.localeCompare(b.status);
      }
    });
  }

  editTask(task: Task) {
    this.editingTask = { ...task };
  }

  saveTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe(() => {
        this.tasks = this.tasks.map(t => t.id === this.editingTask!.id ? this.editingTask! : t);
        this.editingTask = null; 
      });
    }
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}

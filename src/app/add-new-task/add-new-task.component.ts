import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';  // Correct import
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatSelectModule, FormsModule],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.scss'
})

export class AddNewTaskComponent {
  task = { title: '', description: '', status: 'todo' };

  constructor(private taskService: TaskService) {}

  addTask() {
    this.taskService.addTask(this.task).subscribe(() => {
      // Handle success (e.g., navigate back or show a success message)
    });
  }
}

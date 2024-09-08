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
  showSuccessMessage = false;
  
  constructor(private taskService: TaskService) {}

  addTask() {
    this.taskService.addTask(this.task).subscribe(() => {
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000); // Hide after 3 seconds
      this.task = { title: '', description: '', status: 'todo' }; // Reset form
    });
  }
}

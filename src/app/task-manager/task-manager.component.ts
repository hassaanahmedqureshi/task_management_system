import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskService } from '../services/task.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [MatSlideToggleModule, CommonModule, MatCardModule, MatListModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.scss',
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = []; 

  constructor(private taskService: TaskService) {}
  
  ngOnInit() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
}

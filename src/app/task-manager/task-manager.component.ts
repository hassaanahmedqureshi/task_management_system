import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  searchTerm: string = '';
  sortOption: string = 'title';
  isLoading: boolean = true;  // Added to track loading state
  showEditModal: boolean = false;
  editingTask: Task | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
      this.filteredTasks = data;
      this.isLoading = false;  // Set loading to false once data is loaded
    });
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.sortTasks();
  }

  sortTasks() {
    const statusOrder: { [key: string]: number } = { todo: 1, inProgress: 2, done: 3 };
    this.filteredTasks.sort((a, b) => {
      if (this.sortOption === 'az') {
        return a.title.localeCompare(b.title);  // Sort A-Z
      } else if (this.sortOption === 'za') {
        return b.title.localeCompare(a.title);  // Sort Z-A
      } else if (this.sortOption === 'status') {
        return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);  // Sort by status order
      }
      return 0;
    });
  }
  

  openEditModal(task: Task) {
    this.editingTask = { ...task };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingTask = null;
  }

  saveTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask).subscribe(() => {
        this.tasks = this.tasks.map(t => t.id === this.editingTask!.id ? this.editingTask! : t);
        this.filteredTasks = this.tasks; // Ensure filtered list updates
        this.closeEditModal(); 
      });
    }
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.filteredTasks = this.tasks; // Ensure filtered list updates
    });
  }

  navigateToDetails(taskId: string) {
    this.router.navigate(['/tasks', taskId]);
  }
}

import { Routes } from '@angular/router';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

export const routes: Routes = [
      { path: 'tasks', component: TaskManagerComponent },
      { path: 'add-new-task', component: AddNewTaskComponent },
      { path: 'tasks/:id', component: TaskDetailComponent },
      { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

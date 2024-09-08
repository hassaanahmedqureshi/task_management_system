import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';

export const routes: Routes = [
      { path: 'tasks', component: TaskManagerComponent },
      { path: 'add-new-task', component: AddNewTaskComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' }
];

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { TaskManagerComponent } from './app/task-manager/task-manager.component';

bootstrapApplication(TaskManagerComponent, appConfig)
  .catch((err) => console.error(err));

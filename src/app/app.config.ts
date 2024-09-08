import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';  // Import FormsModule

import { routes } from './app.routes';
import { AppComponent } from './app.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(), provideAnimationsAsync(),
    FormsModule, provideAnimationsAsync(), provideAnimationsAsync()
  ]
};

bootstrapApplication(AppComponent, {
  providers: [],
}).catch((err) => console.error(err));

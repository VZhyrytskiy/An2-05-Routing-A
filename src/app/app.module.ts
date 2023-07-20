import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

// add this line if you don't have access to
// index.html and you want to set base tag
// import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { SpinnerComponent } from './widgets';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    TasksModule,
    UsersModule,
    AdminModule,
    SpinnerComponent,

    // MUST BE LAST
    AppRoutingModule

  ],
  providers: [
    // add this line if you don't have access to
    // index.html and you want to set base tag
    // { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    const replacer = (key: string, value: unknown): string =>
      typeof value === 'function' ? value.name : (value as string);

    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}

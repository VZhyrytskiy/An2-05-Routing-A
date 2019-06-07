import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

// add this line if you don't have access to
// index.html and you want to set base tag
// import { APP_BASE_HREF } from '@angular/common';

import { AdminModule } from './admin/admin.module';
import { LayoutModule } from './layout/layout.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerModule } from './widgets/spinner/spinner.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    LayoutModule,
    TasksModule,
    UsersModule,
    AdminModule,
    SpinnerModule.forRoot(),
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
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}

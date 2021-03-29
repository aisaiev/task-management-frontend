import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { TaskModule } from './task/task.module';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    NgbToastModule,
    CoreModule,
    AuthModule,
    TaskModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

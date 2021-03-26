import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageService, NgxWebstorageModule } from 'ngx-webstorage';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.interceptor';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    HttpClientModule,
    NgxWebstorageModule.forRoot({
      prefix: '',
      separator: ''
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [LocalStorageService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [Router]
    }
  ]
})
export class CoreModule { }

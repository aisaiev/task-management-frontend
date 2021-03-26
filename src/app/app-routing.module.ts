import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notFoundRoute } from './layouts/not-found/not-found.route';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  },
  ...notFoundRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

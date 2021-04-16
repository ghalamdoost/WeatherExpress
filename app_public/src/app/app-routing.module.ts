import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainWeatherComponent
  },
  {
    path: 'detail/:name',
    component: DetailComponent
  }            
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

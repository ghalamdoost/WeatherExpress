import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailComponent } from './detail/detail.component';
import { LastCitiesComponent } from './last-cities/last-cities.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'main',
    pathMatch:'full'
  },
  {
    path: 'main',
    component: MainWeatherComponent
  },
  {
    path: 'detail/:name/:country/:unit',
    component: DetailComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'last',
    component:LastCitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

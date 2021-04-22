import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchedWeatherSchema } from '../weather';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-last-cities',
  templateUrl: './last-cities.component.html',
  styleUrls: ['./last-cities.component.css']
})
export class LastCitiesComponent implements OnInit {

  public searchedWeathers : SearchedWeatherSchema[];

  constructor(private weatherService: WeatherDataService, private route: Router) { }

  ngOnInit(): void {
    this.getSearchedWeathers();
  }

  private getSearchedWeathers() {
    this.weatherService.getSearchedWeathers().subscribe(foundItem => this.searchedWeathers = foundItem);              
  }

  public showDetail(res : SearchedWeatherSchema){
    this.route.navigate(['/detail/'+encodeURI(res.name)+'/'+res.country+'/'+res.units]);
  }

}

import { Component, OnInit } from '@angular/core';
import { SearchedWeatherSchema } from '../weather';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-last-cities',
  templateUrl: './last-cities.component.html',
  styleUrls: ['./last-cities.component.css']
})
export class LastCitiesComponent implements OnInit {

  public searchedWeathers : SearchedWeatherSchema[];

  constructor(private weatherService: WeatherDataService) { }

  ngOnInit(): void {
    this.getSearchedWeathers();
  }

  private getSearchedWeathers() {
    this.weatherService.getSearchedWeathers().subscribe(foundItem => this.searchedWeathers = foundItem);              
  }

}

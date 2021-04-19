import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherSchema } from '../weather';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public weatherResult : WeatherSchema;

  constructor(private weatherService: WeatherDataService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getWeather();
  }

  private getWeather() : void {
    const name = this.route.snapshot.paramMap.get('name');
    const country = this.route.snapshot.paramMap.get('country');
    const unit = this.route.snapshot.paramMap.get('unit');
    this.weatherService.getWeather(name,country,unit).then(foundItem => this.weatherResult = foundItem);           
  }

  public cancel() : void {
    this.router.navigate(['/main']);
  }

}

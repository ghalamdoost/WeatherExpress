import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchedWeatherSchema, WeatherSchema } from '../weather';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public weatherResult : WeatherSchema;
  
  constructor(private weatherService: WeatherDataService, private route : ActivatedRoute, private router : Router) { 
  }

  ngOnInit() { 
    this.getWeather();  
  } 

  private getWeather(){
    const name = this.route.snapshot.paramMap.get('name');
    const country = this.route.snapshot.paramMap.get('country');
    const unit = this.route.snapshot.paramMap.get('unit');
    
    if(name!=null || country!=null || unit!=null){
      this.weatherService.getWeather(name,country,unit).subscribe(foundItem => { this.weatherResult = foundItem});   
      console.log(this.weatherResult);           
    }
  }
}

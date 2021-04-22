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
    //subscription to support param changes 
    this.route.params.subscribe(params => {
        const name = params['name'];
        const country = params['country'];
        const unit = params['unit'];  
        
        if(name!=null || country!=null || unit!=null){
          this.weatherService.getWeather(name,country,unit).subscribe(foundItem => { this.weatherResult = foundItem});   
          console.log(this.weatherResult);           
        }
    });    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.css']
})
export class MainWeatherComponent implements OnInit {
  //Variables
  public name : String = "";

  constructor(private route: Router) { }

  ngOnInit(): void {    
  }

  public findWeather(name): void{
    this.route.navigate(['/detail/'+name]);
  }
}

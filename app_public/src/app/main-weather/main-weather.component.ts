import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import cities from '../../assets/cities.json';

@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.css']
})
export class MainWeatherComponent implements OnInit {
  //Variables  
  public myControl = new FormControl();
  public unitControl = new FormControl();
  public options : string[] = [];
  public filteredOptions : string[] = [];
  public 


  public findWeather(): void{
    //Dont forget to validate here
    //
    var nameCountry = this.myControl.value.toString().split(', ');
    var name = encodeURI(nameCountry[0]);
    var unit = this.unitControl.value;
    var country = nameCountry[1];
    this.route.navigate(['/detail/'+name+'/'+country+'/'+unit]);
  }  

  ngOnInit(): void {
    //Made API cities result readable
    for(var i in cities){
      this.options.push(cities[i].name+', '+cities[i].country);
    }
    this.options.sort();
    //Default unit value
    this.unitControl.setValue('metric');
  } 

  public suggest() {
    const filterValue = this.myControl.value.toLowerCase();
    this.filteredOptions = this.options.filter(c => c.toLowerCase().startsWith(filterValue)).slice(0, 5);
  } 

  public updateInput(value : string){
    this.myControl.setValue(value);    
  }

  constructor(private route: Router) { }
}

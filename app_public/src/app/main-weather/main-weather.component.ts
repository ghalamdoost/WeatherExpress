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
  public alertMessage = "";


  public findWeather(): void{
    var inputValue = this.myControl.value;
    //Required validation
    if(!inputValue){
      this.alertMessage ="The City Name is required";
      return;
    }
    //Validate if the city entered is on the list
    if(!this.options.filter(c => c.toLowerCase() == inputValue.toString().toLowerCase()).length){
      this.alertMessage = "The city name is not on the list"; 
      return;
    }
    var nameCountry = inputValue.toString().split(', ');
    //Normalize the string to avoid special characters on the city name (ex. Bogotá - Bogota)
    var name = nameCountry[0];    
        
    //name = this.normalizeText(name);
    name = encodeURI(name);    
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
    //get the actual value and removes the special characters
    const filterValue = this.normalizeText(this.myControl.value.toLowerCase());    
    
    if(filterValue){
      this.filteredOptions = this.options.filter(c => this.normalizeText(c.toLowerCase()).startsWith(filterValue)).slice(0, 5);
    }else{
      this.filteredOptions =  [];
    }
  } 

  //remove special characters from the string
  normalizeText(txt : string) : string{
    return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  public updateInput(value : string){
    this.myControl.setValue(value);    
    //puts the list empty to hide the div
    this.filteredOptions = [];
  }

  constructor(private route: Router) { }
}

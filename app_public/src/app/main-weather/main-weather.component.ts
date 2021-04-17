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
  
  public name : String = "";
  public citiesResult = [];/*[{
                            cityId: '5454711',
                            name: 'London',
                            country: 'CA',
                            altCountry: '',
                            muni: '',
                            muniSub: '',
                            featureClass: 'P',
                            featureCode: 'PPLA2',
                            adminCode: 'NM',
                            population: 545852,
                            loc: {
                              type: 'Point',
                              coordinates: [-106.65114, 35.084] 
                            }
                          }, {
                            cityId: '5476960',
                            name: 'Toronto',
                            country: 'CA',
                            altCountry: '',
                            muni: '',
                            muniSub: '',
                            featureClass: 'P',
                            featureCode: 'PPL',
                            adminCode: 'NM',
                            population: 6024,
                            loc: {
                              type: 'Point',
                              coordinates: [-106.6428, 35.16199]
                            }
                          }];*/
  public myControl = new FormControl();
  public options : string[] = [];
  public filteredOptions: Observable<string[]>;


  public findWeather(): void{
    var name = this.myControl.value;
    this.route.navigate(['/detail/'+name]);
  }  

  ngOnInit(): void {
    //Made API cities result readable
    for(var i in cities){
      this.options.push(cities[i].name+', '+cities[i].country);
    }
    this.options.sort();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(d => d.toLowerCase().indexOf(filterValue) === 0).slice(0,10);
  }

  constructor(private route: Router) { }
}

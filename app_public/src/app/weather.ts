import {Component, OnInit} from '@angular/core';

  export class WeatherSchema{
    _id: String;
    coord_lon: Number;
    coord_lat: Number;
    weather_id: Number;
    weather_main: String;
    weather_description: String;
    weather_icon: String;
    base: String;
    main_temp: Number;
    main_feels_like: Number;
    main_temp_min: Number;
    main_temp_max: Number;
    main_pressure: Number;
    main_humidity: Number;
    visibility: Number;
    wind_speed: Number;
    wind_deg: Number;
    sys_sunrise: Number;
    sys_sunset: Number;
    timezone: Number;
    name: String;
    objid: Number;
    cod: Number;
    country:String;
    units:String;
  }
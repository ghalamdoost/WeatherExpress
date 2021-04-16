import {Component, OnInit} from '@angular/core';

  export class WeatherSchema{
    coord_lon: Number;
    coord_lat: Number;
    weather_id: Number;
    weather_main: String;
    weather_description: String;
    weather_icon: String;
    timezone: Number;
    name: String;
    objid: Number;
    cod: Number;
  }
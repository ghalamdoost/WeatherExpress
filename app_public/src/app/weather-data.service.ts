import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { WeatherSchema } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private apiBaseURL = 'http://localhost:3000/api';
  public math = Math;
  //getWeatherByName
  public getWeather(name,country,unit) : Promise<WeatherSchema>{
    const url : string = `${this.apiBaseURL}/weathers/${unit}/${name}/${country}`;
    return this.http.get(url).toPromise().then(response => response[0] as WeatherSchema).catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong');
    return Promise.reject(error.message || error);
  }

  constructor(private http: HttpClient) { }
}

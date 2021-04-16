import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { WeatherSchema } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
  private apiBaseURL = 'http://localhost:3000/api';

  //getWeatherByName
  public getWeatherByName(name) : Promise<WeatherSchema>{
    const url : string = `${this.apiBaseURL}/weathers/name/${name}`;
    return this.http.get(url).toPromise().then(response => response as WeatherSchema).catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong');
    return Promise.reject(error.message || error);
  }

  constructor(private http: HttpClient) { }
}

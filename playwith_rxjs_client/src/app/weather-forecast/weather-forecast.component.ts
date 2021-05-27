import { Component, Input, OnInit } from '@angular/core';
import { WeatherForecastService } from '../weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  @Input()coords!: {latitude: number, longitude: number};
  forecastImg = '';

  constructor(private weatherForecastService: WeatherForecastService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    this.forecastImg = '';
    if(changes.coords.currentValue)
      this.forecastImg=this.weatherForecastService.getForecast(changes.coords.currentValue);
  }

}

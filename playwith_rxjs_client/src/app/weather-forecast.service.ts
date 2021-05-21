import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  cache!: {key: string, call: string}[];

  constructor(private geolocationService: GeolocationService) {
    this.cache = [];
   }

  getForecast() {
    return this.geolocationService.getLocation().pipe(
      map((coords) => {
        const key = `${coords.longitude},${coords.latitude}`;
        let cachedIndex = this.cache.findIndex(val => val.key == key);
        if(cachedIndex == -1) {
          this.cache.push({
            key: key,
            call: `http://www.7timer.info/bin/astro.php?lon=${coords.longitude}&lat=${coords.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`
          });
          cachedIndex = this.cache.findIndex(val => val.key == key);
        }
        return this.cache[cachedIndex].call;
      })
    )
  }
}

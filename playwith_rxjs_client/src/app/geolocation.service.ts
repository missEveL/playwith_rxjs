import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private defaultPosition = {longitude: -117.8677, latitude: 33.7455};

  constructor() {}

  public getLocation() : Observable<any> {

    return new Observable(observer => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position.coords);
          }, () => {
            observer.next(this.defaultPosition);
          })
      } else {
        observer.next(this.defaultPosition);
      }
    })
  }
}

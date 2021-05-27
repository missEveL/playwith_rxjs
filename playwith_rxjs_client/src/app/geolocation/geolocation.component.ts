import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
  @Output()coords = new EventEmitter();
  
  weatherForecastForm = new FormGroup({
    position : new FormControl('')
  })

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit(): void {
    this.geolocationService.getLocation().subscribe(
      (position) => {
        const postTxt = `${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`;
        this.weatherForecastForm.patchValue({
        position: postTxt
      });
      this.coords.emit(postTxt);
    });
  }

  onSubmit(): void {
    this.coords.emit(this.weatherForecastForm.value.position);
  }
}

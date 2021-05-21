import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {

  position = new FormControl('');

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit(): void {
    this.geolocationService.getLocation().subscribe(
      position => this.position.setValue(`${position.latitude.toFixed(4)}, ${position.longitude.toFixed(4)}`)
    )
  }
}

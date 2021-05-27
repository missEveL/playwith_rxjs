import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  navBarExpand = false;
  coordsInput!: {latitude: number, longitude: number};
  constructor() { }

  ngOnInit(): void {
  }
  setCoords(value: any) {
    let posArr = value.split(',');
    this.coordsInput = {
      latitude: posArr[0],
      longitude: posArr[1]
    }
  }

}

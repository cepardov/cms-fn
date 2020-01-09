import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sliderEnable = true;

  constructor() { }

  ngOnInit() {
    const slider = document.querySelectorAll('.slider');
    M.Slider.init(slider, {indicators: true, height: 300});
  }

}

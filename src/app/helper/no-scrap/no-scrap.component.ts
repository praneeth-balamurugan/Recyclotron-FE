import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-scrap',
  templateUrl: './no-scrap.component.html',
  styleUrls: ['./no-scrap.component.scss'],
})
export class NoScrapComponent implements OnInit {
  constructor(public location: Location) {}

  ngOnInit(): void {}
}

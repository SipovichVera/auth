import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  cars: Car[] = [];
  currentTutorial = null;
  currentIndex = -1;

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.retrieveCar();
  }

  retrieveCar(): void {
    this.carsService.getAll().subscribe(
      data => {this.cars = data, console.log(data)},
      err => {console.log(err)}
    )
  }

  refreshList(): void {
    this.retrieveCar();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }
}

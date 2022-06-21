import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/car';
import { CarsService } from 'src/app/services/cars.service';

@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.scss']
})
export class CarsAddComponent implements OnInit {

  car: Car = {model:'' , mark: '', color: '', price: 0, published: false};
  submitted: boolean = false;

  constructor(private carService: CarsService) { }

  addCar(): void {
    const car = {
      model: this.car.model,
      mark: this.car.mark,
      color: this.car.color,
      price: this.car.price,
      published: this.car.published, 
    };

    this.carService.add(car).subscribe(
      data => {console.log(data), this.submitted = true},
      err => {console.log(err)}
    );
  }

  ngOnInit(): void {
  }

  newCar(): void {
    this.submitted = false;
    this.car = {
      model:'' , 
      mark: '', 
      color: '', 
      price: 0, 
      published: false
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bntu-info',
  templateUrl: './bntu-info.component.html',
  styleUrls: ['./bntu-info.component.scss']
})
export class BntuInfoComponent implements OnInit {

  advantages = [
    'университет имеет полную свободу в составлении расписания',
    'удаленное подключение к занятию',
    'позволяет быть мобильным и быть готовым подстраиваться под сложившуюся ситуацию'];


  bntuFeatures = ['17 факультетов', '9 колледжей-филиалов', '7 институтов', '18 общежитий', '12 культурных центров', '20 инновационных предприятий'];

  constructor() { }

  ngOnInit(): void {
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent implements OnInit {
  form: any = {
    username: null, 
    password: null,
    name: null,
    surname: null,
  }

  isRegistr = this.userService.isRegistr;
  isFail: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = '';
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router 
    ) { }

  ngOnInit(): void {
    }

  onSubmit(): void {
    const { username, password, name, surname } = this.form;
    this.authService.registr(username, password, name, surname).subscribe(
      (data) => { 
        this.userService.currentUser.next(data.user);
        this.isFail = false;
        this.isSuccess = true;
        this.route.navigate(['account']);
      },
      (err) => {
        this.errorMessage = err.error.message; 
        this.isFail = true;
      }      
    )
  }
}
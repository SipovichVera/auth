import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.scss']
})
export class RegistrComponent implements OnInit {
  form: any = {
    username: null, 
    password: null,
  }

  isRegistr = this.userService.isRegistr;
  isFail: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.registr(username, password).subscribe(
      (data) => { 
        this.userService.currentUser.next(data.user);
        this.isFail = false;
      },
      (err) => {
        this.errorMessage = err.error.message; 
        this.isFail = true;
      }      
    )
  }
}
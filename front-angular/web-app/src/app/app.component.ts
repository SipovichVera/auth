import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'web-app';
  constructor(
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private accountService: AccountService,
    ) { }
  
  ngOnInit(): void {
  }
  
  
  isRegistr: Observable<boolean> = this.userService.isRegistr;
  // isNotRegistr: Observable<boolean> = this.userService.isNotRegistr;
  isAdmin: Observable<boolean> = this.userService.isAdmin;
  userInfo: Observable<boolean> = this.accountService.userInfo;
  
  logOut(): void {
    this.tokenStorage.signOut();
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  isRegistr: Observable<boolean> = this.userService.isRegistr;
  isAdmin: Observable<boolean> = this.userService.isAdmin;
  userInfo: any = {surname: "sipovich", username: "vera"};
  lessons: any[] = [
    {
      description:"Object-oriented programming (OOP) is a style of programming characterized by the identification of classes of objects closely linked with the methods (functions) with which they are associated.",
      id: 1,
      name: "oop",
      isLectureInProgress: true
    },
    {
      description:"A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).",
      id: 2,
      name: "bd"
    },
  ];
  activeLesson: any;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getLessons();
  }

  getLessons() {
    this.accountService.userInfo.subscribe(res => {
      this.userInfo = res;
      this.lessons = res.lessons;
      console.log(this.lessons);
      this.cdr.detectChanges();
    });
  } 

  selectLesson(lessonId: number) {
      console.log(lessonId);
      this.activeLesson = {...this.lessons.find(les => les.id === lessonId)};
  }

  logOut(): void {
    this.tokenStorage.signOut();
  }
}

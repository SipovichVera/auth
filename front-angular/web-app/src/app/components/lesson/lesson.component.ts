import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, Subject, combineLatest, map, shareReplay, tap } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {

  isRegistr: Observable<boolean> = this.userService.isRegistr;
  isAdmin: Observable<boolean> = this.userService.isAdmin;
  userInfo$: Observable<any> = this.accountService.userInfo.pipe(
    shareReplay(), 
    tap(({lessons}) => {
      this.activeLessonId$.next(lessons[0].id ?? null);
    })
    );
  // {surname: "sipovich", username: "vera"};
  lessons$: Observable<any[]> = this.userInfo$.pipe(map(({lessons}) => lessons));
  // [
  //   {
  //     description:"Object-oriented programming (OOP) is a style of programming characterized by the identification of classes of objects closely linked with the methods (functions) with which they are associated.",
  //     id: 1,
  //     name: "oop",
  //     isLectureInProgress: true
  //   },
  //   {
  //     description:"A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS).",
  //     id: 2,
  //     name: "bd"
  //   },
  // ];
  activeLessonId$ = new Subject<any>();
  activeLesson$ = combineLatest([this.lessons$, this.activeLessonId$]).pipe(
    map(([lessons, lessonId]) => {
      return lessons.find(({id}) => id === lessonId);
    })
  );

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private cdr: ChangeDetectorRef
  ) { }

  selectLesson(lessonId: number) {
    this.activeLessonId$.next(lessonId);
  }

  logOut(): void {
    this.tokenStorage.signOut();
  }
}

import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, Subject, combineLatest, map, shareReplay, tap, filter } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { QUERY_CALL_ID } from '../../contants/call';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {
  lessonQuery = QUERY_CALL_ID;
  isAdmin: Observable<boolean> = this.userService.isAdmin;
  userInfo$: Observable<any> = this.accountService.userInfo.pipe(
    filter(Boolean),
    tap(({ lessons }) => {
      this.activeLessonId$.next(lessons[0]?.id ?? null);
    })
    );
  lessons$: Observable<any[]> = this.userInfo$.pipe(map(({lessons}) => lessons));
  activeLessonId$= new Subject<any>();
  activeLesson$ = combineLatest([this.lessons$, this.activeLessonId$]).pipe(
    map(([lessons, lessonId]) => {
      return lessons.find(({id}) => id === lessonId);
    })
  );

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private router: Router
  ) { }

  selectLesson(lessonId: number) {
    this.activeLessonId$.next(lessonId);
  }

  generateCallSession(lessonId: any) {
    this.http.put('http://localhost:8080/api/lesson/call', { lessonId }).subscribe((lesson) => {
      // @ts-ignore
      this.router.navigate(['/lesson-call'], {queryParams: {[this.lessonQuery]: lesson.callId}})
    })
  }

  logOut(): void {
    this.tokenStorage.signOut();
  }
}

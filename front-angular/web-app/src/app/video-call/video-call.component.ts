import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamManager } from 'openvidu-browser';
import { filter, tap } from 'rxjs';
import { VideoCallService } from './services/video-call.service';
import { QUERY_CALL_ID } from '../contants/call';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss']
})
export class VideoCallComponent implements OnInit {
  joined = false;
  users: StreamManager[] = [];
  currentUser: StreamManager  | undefined = undefined;
  callLessonId: string = '';
  constructor(
    public videoCallService: VideoCallService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.callLessonId = this.route.snapshot.queryParams[QUERY_CALL_ID];
    this.videoCallService.setDevice(this.callLessonId);
  }

  join() {
    this.videoCallService.join();

    this.videoCallService.currentUser$
    .pipe(
      filter(x => !!x),
      tap(x => {
        this.currentUser = x;
      })
    ).subscribe();

    this.videoCallService.users$
    .pipe(
      filter(x => !!x),
      tap(x => {
        this.users = x;
      })
    ).subscribe();

    this.joined = true;
  }

  changeVideoState() {
    if (this.videoCallService.videoEnabled) {
      this.videoCallService.disableVideo();
    } else {
      this.videoCallService.enableVideo();
    }
  }

  share() {
    this.videoCallService.shareScreen();
  }
}

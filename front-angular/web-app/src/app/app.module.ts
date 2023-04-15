import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth/auth.module';
import { RegistrComponent } from './components/registr/registr.component';
import { LoginComponent } from './components/login/login.component';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CarsAddComponent } from './components/cars-add/cars-add.component';
import { CarsDetailsComponent } from './components/cars-details/cars-details.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { LessonComponent } from './components/lesson/lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrComponent,
    LoginComponent,
    CarsListComponent,
    CarsAddComponent,
    CarsDetailsComponent,
    VideoChatComponent,
    LessonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

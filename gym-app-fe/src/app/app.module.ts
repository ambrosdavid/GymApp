import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PrivateAreaComponent } from './private-area/private-area.component';
import { WeightRoomReservationComponent } from './weight-room-reservation/weight-room-reservation.component';
import { LessonReservationComponent } from './lesson-reservation/lesson-reservation.component';
import {ChunkPipe} from "./weight-room-reservation/weight-room-reservation.component";
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InputFieldComponent } from './shared-components/input-field/input-field.component';
import { MessageResponseDialogComponent } from './shared-components/message-response-dialog/message-response-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import { SlotDetailComponent } from './slot-detail/slot-detail.component';
import { DayDetailComponent } from './day-detail/day-detail.component';
import { NgxTimelineAlbeModule } from 'ngx-timeline-albe';
import { NgxTimelineAcracodeModule } from 'ngx-timeline-acracode';
import { CoursesComponent } from './courses/courses.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PrivateAreaComponent,
    WeightRoomReservationComponent,
    LessonReservationComponent,
    ChunkPipe,
    InputFieldComponent,
    MessageResponseDialogComponent,
    SlotDetailComponent,
    DayDetailComponent,
    CoursesComponent,
    LessonDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        MatDialogModule,
        BrowserModule,
        NoopAnimationsModule,
        HttpClientJsonpModule,
        NgxTimelineAcracodeModule,
        BrowserAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

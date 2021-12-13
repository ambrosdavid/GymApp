import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Slot} from "../../models/Slot";
import {Lesson} from "../../models/Lesson";
import {User} from "../../models/User";
import {ApiService} from "../api.service";
import {CommonService} from "../CommonService";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";
import {TimelineModel} from "ngx-timeline-acracode";
import {Subscription} from "../../models/Subscription";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  list: any = [
    {
      datetime: new Date('2020-03-29 23:59:59'),
      header: 'Sample of header',
      body: [
        {
          tag: 'h1',
          content: "Lorem ipsum"
        },
        {
          tag: 'p',
          content: 'Lorem ipsum dolor sit amet, nisl lorem, wisi egestas orci tempus class massa.'
        }],
      footer: 'Sample of footer. See <a href=\"https://github.com/Albejr/ngx-timeline\" target=\"_blank\">more details</a>'
    }
  ];

  events: any;
  commonData: any ={
    current_reservation:0,
    max_capacity: 0
  };

  subscriptions:Subscription[] = [];

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
                date:Date,
                message: string,
                lessons: Lesson[],
                user: User
              },
              private api:ApiService, public dialog: MatDialog,  private commonService : CommonService) { }

  ngOnInit(): void {

    this.api.getMySubscription().subscribe(subs=>{
      this.subscriptions=subs;
    });

    if(this.data.message == 'SCSFL') {
      this.dialog.open(MessageResponseDialogComponent, {
        data: {
          title: "Subscribed successful",
          message: "Subscribed successful"
        }
      });
    }

    this.events = new Array<TimelineModel>();

    this.data.lessons = this.data.lessons.sort((a,b)=>{
      return new Date('1970-01-01T' + a.time + 'Z').getTime()-
        new Date('1970-01-01T' + b.time + 'Z').getTime()
    })

    this.data.lessons.forEach( (lesson)=>{
      this.events.push({
        'date': this.data.date,
        'header': lesson.course + " " + lesson.time,
        'body': {'description': lesson.course_description + "\nCurrent capacity: " + lesson.current_reservations + "/"+ lesson.max_participants
                ,'lesson':lesson},
        'iconheadercolor':'rgb(163, 69, 73)'
      });
    })
  }

  sendRefreshMainComponent(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('updateLessons', this.data.date);
  }

  makeLessonReservation(idLesson: string) {
    this.api.makeLessonReservation(idLesson).subscribe(msg=>{
      if(msg.status==200) {
        this.sendRefreshMainComponent();
      } else {
        this.addLessonFailed(msg.message);
      }
    });
  }
  private addLessonFailed(msg: string) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Add lesson failed",
        message: msg
      }
    });
  }

  isntAlreadySubscribed(lesson: Lesson) {
    return (this.subscriptions.filter(s => s.slot == lesson.id)).length == 0
  }

}

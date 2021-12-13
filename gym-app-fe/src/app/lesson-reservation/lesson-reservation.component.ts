import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faAddressBook, faKey} from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../api.service";
import {Course} from "../../models/Course";
import {MessageReponse} from "../../models/MessageResponse";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CommonService} from "../CommonService";

@Component({
  selector: 'app-lesson-reservation',
  templateUrl: './lesson-reservation.component.html',
  styleUrls: ['./lesson-reservation.component.css']
})
export class LessonReservationComponent implements OnInit {

  @Output() wantScreen = new EventEmitter<boolean>();

  icons = {
    basic : faAddressBook,
    pwd : faKey
  }

  body : any = {
    date : "",
    time : "",
    max_participants : 0,
    course: "" //ID CORSO
  }

  courses : Course[] = [];
  selectedCourse!: string;
  constructor(private api:ApiService, public dialog: MatDialog,private commonService :CommonService) { }


  ngOnInit(): void {
    this.api.getCourses().subscribe((courseArray) => {
      this.courses=courseArray;
    });
  }

  saveLesson(){
    let y: number = +this.body.max_participants;
    this.body.max_participants = y;
    if(this.body.time != "" && this.body.date != "" && this.body.course != "" && this.body.max_participants > 0){
      this.api.addLesson(this.body).subscribe(resp=>{
        if(resp.status==200) {
          this.addLessonSuccess(resp.message);
        } else {
          this.addLessonFailed(resp.message);
        }
      })
    }
  }

  private addLessonSuccess(msg: string) {
    this.sendRefreshMainComponent();
  }

  sendRefreshMainComponent(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdateFromAddLesson('sendUpdateFromAddLesson');
  }

  private addLessonFailed(msg: string) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Add lesson failed",
        message: msg
      }
    });
  }

  closeScreen() {
    this.wantScreen.emit(false);
  }

  onSelectCourse(course: string) {
      this.selectedCourse = course;
      this.body.course = this.selectedCourse;
  }
}

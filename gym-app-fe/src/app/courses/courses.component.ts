import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {MatDialog} from "@angular/material/dialog";
import {User} from "../../models/User";
import {Course} from "../../models/Course";
import {faAddressBook, faKey} from "@fortawesome/free-solid-svg-icons";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {delay} from "rxjs";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  animations: [
    trigger('heightGrow', [
      state('closed', style({
        height: 0,
      })),
      state('open', style({
        height: 400,
      })),
      transition('* => *', [animate(550)])
    ]),
  ]
})
export class CoursesComponent implements OnInit {
  public wantAddCourse:  boolean = false;

  icons = {
    basic : faAddressBook,
    pwd : faKey
  }

  body : any = {
    name : "",
    description : "",
    trainer: ""//ID TRAINER
  }

  selectedTrainer!: string;

  constructor(private api:ApiService, public dialog: MatDialog) { }

  courses : Course [] = [];
  trainers : User [] = [];
  me:User = new User();

  ngOnInit(): void {
    this.api.getMe().subscribe(user=>{
      this.me = user;
    });

    this.initWithCourses();

    this.api.getTrainers().subscribe((trainerArray) => {
        this.trainers=trainerArray;
    });

  }

  initWithCourses(){
    this.api.getCourses().subscribe((courseArray) => {
      this.courses=courseArray;
    });
  }

  public closeAddCourse(res: boolean) {
    this.wantAddCourse = res;
  }

  addCourse() {
    if(this.body.name != "" && this.body.description != "" && this.body.trainer != "" ){
      this.api.addCourse(this.body).subscribe(resp=>{
        if(resp.status==200) {
          this.addCourseSuccess(resp.message);
        } else {
          this.addCourseFailed(resp.message);
        }
      })
    }else{
      this.addCourseFailed("Error from front end insertion");
    }
  }
  private addCourseSuccess(msg: string) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Add course success",
        message: msg
      }
    });
    this.initWithCourses();
  }

  private addCourseFailed(msg: string) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Add course failed",
        message: msg
      }
    });
  }

  onSelectTrainer(trainer: string) {
    this.selectedTrainer = trainer;
    this.body.trainer = this.selectedTrainer;
  }

  state = "closed";

  changeState(): void {
      (this.state == "closed") ? this.state = "open" : this.state = "closed";

      if(!this.wantAddCourse) {
        setTimeout(() => {
            this.wantAddCourse = !this.wantAddCourse;
          },
          550);
      }else
        this.wantAddCourse = !this.wantAddCourse;
  }
}

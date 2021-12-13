import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ApiService} from "../api.service";
import {Slot} from "../../models/Slot";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DayDetailComponent} from "../day-detail/day-detail.component";
import {CommonService} from "../CommonService";
import {Subscription} from "rxjs";
import {Lesson} from "../../models/Lesson";
import {User} from "../../models/User";
import {LessonDetailComponent} from "../lesson-detail/lesson-detail.component";

export class CalendarDay {
  public date: Date;
  public title: string ="Gym Calendar";
  public isPastDate: boolean;
  public isToday: boolean;

  constructor(d: Date) {
    this.date = d;
    this.isPastDate = d.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    this.isToday = d.setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0);
  }

}


@Pipe({
  name: 'chunk'
})
export class ChunkPipe implements PipeTransform {

  transform(calendarDaysArray: any, chunkSize: number): any {
    let calendarDays: any[][] = [];
    let weekDays: any[] = [];

    calendarDaysArray.map((day: any, index: number) => {
      weekDays.push(day);
      // here we need to use ++ in front of the variable else index increase
      //will happen after the evaluation but we need it to happen BEFORE
      if (++index % chunkSize  === 0) {
        calendarDays.push(weekDays);
        weekDays = [];
      }
    });
    return calendarDays;
  }
}


@Component({
  selector: 'app-weight-room-reservation',
  templateUrl: './weight-room-reservation.component.html',
  styleUrls: ['./weight-room-reservation.component.css']
})
export class WeightRoomReservationComponent implements OnInit {
  public calendar: CalendarDay[] = [];
  public monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  public displayMonth: string = "";
  private monthIndex: number = 0;
  loadSlotDetail: boolean = false;
  public selectedSlot!: Slot;

  public slots: Slot[] = [];
  private lessons: Lesson[] = [];

  messageReceived: string = "";
  private commonServiceSub: Subscription;
  seeSlots: boolean = true;
  seeLessons: boolean = true;

  me:User = new User();
  wantAddSlot: boolean=false;
  wantAddLesson: boolean=false;

  constructor(private api:ApiService, public dialog: MatDialog, private commonService : CommonService) {
    // subscribe to sender component messages
    this.commonServiceSub = this.commonService.getUpdate().subscribe((message) => { //message contains the data sent from service
      this.messageReceived = message.text;
      let date = message.date;
      if((this.messageReceived) == 'updateSlots')
        this.fillCalendarWithSlotsAndReopen(()=>{
          this.showSlotsOfAndReopen(date)
        });
      //updateLessons
      if((this.messageReceived) == 'updateLessons')
        this.fillCalendarWithLessonsAndReopen(()=>{
          this.showLessonsOfDayAndReopen(date)
        });
    });

    this.commonServiceSub = this.commonService.getUpdateFromAddSlot().subscribe((message) => { //message contains the data sent from service
      if((message.text) == 'sendUpdateFromAddSlot')
        this.fillCalendarWithSlots();
    });

    this.commonServiceSub = this.commonService.getUpdateFromAddLesson().subscribe((message) => { //message contains the data sent from service
      if((message.text) == 'sendUpdateFromAddLesson')
        this.fillCalendarWithLessons();
    });

  }
  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.commonServiceSub.unsubscribe();
  }

  ngOnInit(): void {
    this.generateCalendarDays(this.monthIndex);
    this.fillCalendarWithSlots();
    this.fillCalendarWithLessons();
    this.api.getMe().subscribe(user=>{
      this.me = user;
    });
  }

  public closeAddSlot(res: boolean) {
    this.wantAddSlot = res;
  }

  public closeAddLesson(res: boolean) {
    this.wantAddLesson = res;
  }

  private generateCalendarDays(monthIndex: number): void {
    // we reset our calendar
    this.calendar = [];

    // we set the date
    let day: Date = new Date(new Date().setMonth(new Date().getMonth() + monthIndex));

    // set the dispaly month for UI
    this.displayMonth = this.monthNames[day.getMonth()];

    let startingDateOfCalendar = this.getStartDateForCalendar(day);

    let dateToAdd = startingDateOfCalendar;

    for (var i = 0; i < 42; i++) {
      this.calendar.push(new CalendarDay(new Date(dateToAdd)));
      dateToAdd = new Date(dateToAdd.setDate(dateToAdd.getDate() + 1));
    }
  }

  private getStartDateForCalendar(selectedDate: Date){
    // for the day we selected let's get the previous month last day
    let lastDayOfPreviousMonth = new Date(selectedDate.setDate(0));

    // start by setting the starting date of the calendar same as the last day of previous month
    let startingDateOfCalendar: Date = lastDayOfPreviousMonth;

    // but since we actually want to find the last Monday of previous month
    // we will start going back in days intil we encounter our last Monday of previous month
    if (startingDateOfCalendar.getDay() != 1) {
      do {
        startingDateOfCalendar = new Date(startingDateOfCalendar.setDate(startingDateOfCalendar.getDate() - 1));
      } while (startingDateOfCalendar.getDay() != 1);
    }

    return startingDateOfCalendar;
  }

  public increaseMonth() {
    this.monthIndex++;
    this.generateCalendarDays(this.monthIndex);
  }

  public decreaseMonth() {
    this.monthIndex--
    this.generateCalendarDays(this.monthIndex);
  }

  public setCurrentMonth() {
    this.monthIndex = 0;
    this.generateCalendarDays(this.monthIndex);
  }

  public fillCalendarWithLessons() {
    this.api.getLessons().subscribe((lessonArray) => {
      this.lessons=lessonArray;
    });
  }

  public fillCalendarWithSlots() {
    this.api.getSlots().subscribe((slotArray) => {
      this.slots=slotArray;
    });
  }

  public fillCalendarWithSlotsAndReopen(f: { (): void; (): void; } | undefined) {
    this.api.getSlots().subscribe((slotArray) => {
      this.slots=slotArray;
      if (f) {
        f();
      }
    });
  }

  public fillCalendarWithLessonsAndReopen(f: { (): void; (): void; } | undefined) {
    this.api.getLessons().subscribe((lessonArray) => {
      this.lessons=lessonArray;
      if (f) {
        f();
      }
    });
  }

  openSlotDetail(slot: Slot) {
      this.loadSlotDetail = true;
      this.selectedSlot = slot;
  }

  getSlotsOf(date: Date) : Slot[] {
    return this.slots.filter(slot=> new Date(slot.date).getTime() == new Date(date).getTime());
  }

  getLessonsOf(date: Date) : Lesson[] {
    return this.lessons.filter(slot=> new Date(slot.date).getTime() == new Date(date).getTime());
  }


  showLessonsOfDay(date: Date) {
    if(this.seeLessons) {
      this.dialog.closeAll();
      this.dialog.open(LessonDetailComponent, {
        data: {
          date: date,
          lessons: this.getLessonsOf(date),
          user: this.me
        }
      });
    }
  }

  showSlotsOf(date: Date) {
    if(this.seeSlots) {
      this.dialog.closeAll();
      this.dialog.open(DayDetailComponent, {
        data: {
          date: date,
          slots: this.getSlotsOf(date),
          user: this.me
        }
      });
    }
  }

  showSlotsOfAndReopen(date: Date) {
    this.dialog.closeAll();
    this.dialog.open(DayDetailComponent,{
      data : {
        date : date,
        slots : this.getSlotsOf(date),
        message: 'SCSFL',
        user: this.me
      }
    });
  }

  showLessonsOfDayAndReopen(date: Date) {
    this.dialog.closeAll();
    this.dialog.open(LessonDetailComponent,{
      data : {
        date : date,
        lessons : this.getLessonsOf(date),
        message: 'SCSFL',
        user: this.me
      }
    });
  }
}

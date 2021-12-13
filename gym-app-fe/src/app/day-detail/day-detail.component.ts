import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Slot} from "../../models/Slot";
import {TimelineModel} from "ngx-timeline-acracode";
import {ApiService} from "../api.service";
import {User} from "../../models/User";
import {MessageResponseDialogComponent} from "../shared-components/message-response-dialog/message-response-dialog.component";
import {WeightRoomReservationComponent} from "../weight-room-reservation/weight-room-reservation.component";
import {CommonService} from "../CommonService";
import {Lesson} from "../../models/Lesson";
import {Subscription} from "../../models/Subscription";

@Component({
  selector: 'app-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.css']
})
export class DayDetailComponent implements OnInit {
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
                slots:Slot[],
                message: string,
                user: User
              },
              private api:ApiService, public dialog: MatDialog,  private commonService : CommonService) { }

  ngOnInit() {
    if(this.data.slots==null) this.data.slots = [];

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

    this.data.slots = this.data.slots.sort((a,b)=>{
      return new Date('1970-01-01T' + a.time_from + 'Z').getTime()-
        new Date('1970-01-01T' + b.time_from + 'Z').getTime()
    })

    this.data.slots.forEach((slot)=>{
      this.events.push({
        'date': this.data.date,
        'header': slot.title + " " + slot.time_from + " - "  + slot.time_to,
        'body': {'description': slot.description + "\nCurrent capacity: " + slot.current_reservations + "/"+ slot.max_capacity
                ,'slot':slot},
        'iconheadercolor':'rgb(163, 69, 73)'
      });
    })

   }

  sendRefreshMainComponent(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('updateSlots', this.data.date);
  }

  makeSlotReservation(idSlot: string) {
      this.api.makeSlotReservation(idSlot).subscribe(msg=>{
        if(msg.status==200) {
          this.sendRefreshMainComponent();
        } else {
          this.addSlotFailed(msg.message);
        }
      });
  }
  private addSlotFailed(msg: string) {
    this.dialog.open(MessageResponseDialogComponent, {
      data: {
        title: "Add slot failed",
        message: msg
      }
    });
  }

  isntAlreadySubscribed(slot: Slot) {
    return (this.subscriptions.filter(s => s.slot == slot.id)).length == 0
  }
}

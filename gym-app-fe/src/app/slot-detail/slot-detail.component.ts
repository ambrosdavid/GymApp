import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Slot} from "../../models/Slot";
import {faAddressBook, faKey} from "@fortawesome/free-solid-svg-icons";
import {ApiService} from "../api.service";
import {CommonService} from "../CommonService";

@Component({
  selector: 'app-slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.css']
})
export class SlotDetailComponent implements OnInit {

  @Output() wantScreen = new EventEmitter<boolean>();

  icons = {
    basic : faAddressBook,
    pwd : faKey
  }

  body : any = {
    date : "",
    time_from : "",
    time_to : "",
    max_capacity : 0,
    title : "",
    description : "",
}

  constructor(private api:ApiService, private commonService : CommonService) { }

  ngOnInit(): void {
  }

  closeScreen() {
    this.wantScreen.emit(false);
  }

  saveSlot() {
      if(this.body.time_from != "" && this.body.time_to != "" && this.body.max_capacity > 0){
        this.api.addSlot(this.body).subscribe(resp=>{
          this.sendRefreshMainComponent();
        })
      }
  }


  sendRefreshMainComponent(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdateFromAddSlot('sendUpdateFromAddSlot');
  }

}

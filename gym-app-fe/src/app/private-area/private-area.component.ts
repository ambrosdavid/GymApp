import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {Subscription} from "../../models/Subscription";
import {faAddressBook, faKey} from "@fortawesome/free-solid-svg-icons";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Policy} from "../../models/Policy";
import {Access} from "../../models/Access";

@Component({
  selector: 'app-private-area',
  templateUrl: './private-area.component.html',
  styleUrls: ['./private-area.component.css']
})
export class PrivateAreaComponent implements OnInit {

  me:User = new User();
  meUpdate: User = new User();
  allUsers: User[] = []
  showEditPanel:boolean = false;
  subscriptions:Subscription[] = [];
  policy: Policy[]= [];
  accesses: Access[]=[];

  icons = {
    basic : faAddressBook,
    pwd : faKey
  }

  pp: any = null;
  curpp : any = null;
  imageToShow: any;

  constructor(public router:Router,public api:ApiService) {}

  ngOnInit(): void {
      this.api.getMe().subscribe(user=>{
        this.me = user;
        this.meUpdate=this.me;
      });
      this.api.getMySubscription().subscribe(subs=>{
        this.subscriptions=subs;
      });

      this.api.getAllUsers().subscribe( (users:any[]) =>{
        this.allUsers = users;
      })

      this.api.getProfilePic().subscribe(blob=>{
        this.createImageFromBlob(blob);
      })

    this.api.getPolicies().subscribe(policy=>{
      this.policy = policy;
    })

    this.api.getAccesses().subscribe(accesses=>{
      this.accesses = accesses;
    })
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getToday() {
    return new Date(Date.now()).toLocaleDateString("it-IT");
  }

  flipEditPanel() {

    if (this.showEditPanel){
      this.sendUpdateRequest();
    }

    this.showEditPanel = !this.showEditPanel;
  }

  private sendUpdateRequest() {

    if(this.hasDifferences(this.me,this.meUpdate) || true) {
      this.api.updateUser(this.meUpdate).subscribe(msg=>{
        alert(msg.message);
      });
    }

    if(this.pp!=null){
      let formData = new FormData();
      formData.append('file', this.pp);
      console.log(this.pp);

      this.api.updateProfilePic(formData).subscribe(msg=>{

        this.api.getProfilePic().subscribe(blob=>{
          this.createImageFromBlob(blob);
        })
      })
    }
  }

  getFormattedBirthDate() {
    let date = new Date(this.me.birth_date);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
  }

  hasDifferences(me: User, meUpdate: User) {
    return meUpdate.birth_date != null &&
      new Date(me.birth_date).getTime()!=
      new Date(meUpdate.birth_date).getTime() ||
      me.phone != null && me.phone != meUpdate.phone ||
      me.fiscal_code != null && me.fiscal_code != meUpdate.fiscal_code;
  }

  onFileSelect(event:any) {
    if (event?.target?.files.length > 0) {
      this.pp = event.target.files[0];
    }
  }
}

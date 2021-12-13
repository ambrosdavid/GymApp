import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-message-response-dialog',
  templateUrl: './message-response-dialog.component.html',
  styleUrls: ['./message-response-dialog.component.css']
})
export class MessageResponseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: {
                message:string,
                title:string
              }
  ) {}
}

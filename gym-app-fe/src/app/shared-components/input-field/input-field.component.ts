import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent{

  @Input() icon = faAddressBook;
  @Input() field= {};
  @Output() fieldChange = new EventEmitter();

  @Input() inputType:string = "";
  @Input() inputPlaceHolder = "";

  @Input() label = "";

  constructor() { }

  updateField() {
    this.fieldChange.next(this.field);
  }
}

import {Returnable} from "./Returnable";

export class Slot implements Returnable<Slot>{

  constructor( public id : string,
               public date : Date,
               public time_from : Date,
               public time_to : Date,
               public max_capacity: number,
               public current_reservations: number,
               public title: string,
               public description: string) {
  }

  get info(): string {
    return `#${this.id} - ${this.time_from.getTime()} - ${this.time_to.getTime()} - ${this.max_capacity }`
  }

  parse(r: Response): Slot {
    return this;
  }

}

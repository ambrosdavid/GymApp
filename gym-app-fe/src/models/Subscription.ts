import {Returnable} from "./Returnable";

export class Subscription implements Returnable<Subscription>{

  reservation_type : string;
  date : Date;
  time : Date;
  participant_number: number;
  slot: string;

  constructor(reservation_type: string, date: Date, time: Date, participant_number: number, slot: string) {
    this.reservation_type = reservation_type;
    this.date = date;
    this.time = time;
    this.participant_number = participant_number;
    this.slot = slot;
  }

  parse(r: Response): Subscription {
    throw this;
  }
}

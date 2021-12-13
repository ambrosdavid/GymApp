import {Returnable} from "./Returnable";

export class Access implements Returnable<Access>{

  constructor( public id : string,
               public date : Date,
               public time_entrance : Date,
               public time_exit : Date,
               public user: string
  ) {  }

  parse(r: Response): Access {
    return this;
  }

}

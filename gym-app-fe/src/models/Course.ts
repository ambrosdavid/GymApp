import {Returnable} from "./Returnable";

export class Course implements Returnable<Course>{

  constructor( public id : string,
               public name : string,
               public description: string,
               public trainer: string) {
  }



  parse(r: Response): Course {
    return this;
  }

}

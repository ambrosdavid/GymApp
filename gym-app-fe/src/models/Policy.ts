import {Returnable} from "./Returnable";

export class Policy implements Returnable<Policy>{

  constructor( public id : string,
               public valid_from : Date,
               public valid_to : Date,
               public description: string
                ) {  }

  parse(r: Response): Policy {
    return this;
  }

}

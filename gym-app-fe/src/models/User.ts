import {Returnable} from "./Returnable";
import {Role} from "./Role";

export class User implements Returnable<User> {
  id: string = "";
  name: string = "";
  surname: string = "";
  birth_date!: Date; // !
  fiscal_code: string = "";
  phone: string = "";
  role: Role = Role.CUSTOMER;
  email: string = "";
  password: string = "";
  token: string = "";

  toRestModel() {
    return {
      "name": this.name,
      "surname": this.surname,
      "email": this.email,
      "password": this.password
    }
  }

  static date2String(date:Date):string{
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
  }

  parse(r: Response): User {
    return this;
  }

}

export interface Returnable<T>{
  parse(r:Response):T;
}

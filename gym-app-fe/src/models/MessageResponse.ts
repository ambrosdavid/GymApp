export class MessageReponse {
  message:string = "";
  status:number=200;

  static toMessage(token: string) {
    let message = new MessageReponse();
    message.message = token;
    return message;
  }

  withStatus(code:number):MessageReponse{
    let msg = this;
    msg.status = code;
    return msg;
  }
}

export class TokenResponse {
  token:string = "";
}

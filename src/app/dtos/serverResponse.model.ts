export class ServerResponse {
  status: string;
  poruka: string;
  object: any;
  constructor(status, poruka, object) {
    this.status = status;
    this.poruka = poruka;
    this.object = object;
  }
}

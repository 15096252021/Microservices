export interface userDataInt {
  id: String;
  busy: Boolean;
  initiate: Boolean;
  roomId: String;
}
export interface ACCEPTDataInt extends userDataInt{
  invite:String,
  wait:String
}
export class SocketIoClass {
  userList: Array<userDataInt> = new Array<userDataInt>();
  userSize: number = 0;
  count: number = 0;
  userData: userDataInt = {
    id: '',
    busy: false,
    initiate: false,
    roomId: '',
  };
  ACCEPTData: ACCEPTDataInt = {
    invite: "",
    wait: "",
    id: "",
    busy: false,
    initiate: false,
    roomId: ""
  }
}

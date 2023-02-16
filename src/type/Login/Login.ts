export interface LoginDataInt{
  username: string,
  userpwd: string,
  vercode: string
}

export class LoginDataClass{
  LoginData:LoginDataInt = {
    username: "",
    userpwd:"",
    vercode:""
  }
}
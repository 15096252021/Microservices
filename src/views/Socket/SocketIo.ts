import io from 'socket.io-client';
import { reactive } from 'vue';
import {
  EMIT_UPDATE_USER_LIST,
  EMIT_INVITE,
  EMIT_INVITE_ACCEPT,
  EMIT_INVITE_REJECT,
  EMIT_SIGNAL_START,
  EMIT_SIGNAL_END,
} from '@/views/Socket/context';
import { SocketIoClass, userDataInt,ACCEPTDataInt } from './SocketIOType';
let socket: any = null;
export function createSocket(query: {}) {
  socket = io('http://10.1.1.147:10065', {
    // path: '/mh/ws',
    query: query,
    transports: ['websocket', 'polling'],
    // transports: [''],
    ackTimeout: 30000,
    reconnectionAttempts: 2,
    reconnectionDelay: 2000,
  });
  // 监听用户列表
  socket.on(EMIT_UPDATE_USER_LIST, (data: any) => {
    SocketIoData.userList = data.user;
    SocketIoData.count = data.count;
    SocketIoData.userSize = data.userSize;
  });
  // 监听用户邀请
  socket.on(EMIT_INVITE, (data: any) => {
    SocketIoData.ACCEPTData = data;
  });
  // 监听用户接受邀请
  socket.on(EMIT_INVITE_ACCEPT, (data: any) => {
    SocketIoData.ACCEPTData.id = '';
    console.log(data);
  });
  // 监听用户拒绝邀请
  socket.on(EMIT_INVITE_REJECT, (data: any) => {
    SocketIoData.ACCEPTData.id = '';
    console.log(data);
  });
  // 监听通话开始
  socket.on(EMIT_SIGNAL_START, (data: any) => {
    console.log(data);
  });
  // 监听通话结束
  socket.on(EMIT_SIGNAL_END, (data: any) => {
    console.log(data);
  });
}
export let SocketIoData = reactive(new SocketIoClass());

// 连接socket
export function connectSocket() {
  console.log(socket.disconnected);
  socket.on('connect', () => {
    console.log('连接服务器!');
  });
}
// 断开连接
export function disconnectSocket() {
  socket.close();
}
// 邀请用户
export function inviteUser(user?: userDataInt) {
  socket.emit(EMIT_INVITE, {
    invite: socket.id,
    ...user,
    wait: user?.id,
  });
}
// 接受邀请
export function initiate(data:ACCEPTDataInt,localCameraVideo:any) {
  SocketIoData.ACCEPTData.id = '';
  SocketIoData.ACCEPTData.busy = true;
  console.log(SocketIoData.ACCEPTData.busy);
  
  socket.emit(EMIT_INVITE_ACCEPT, { ...data });
}
// 拒绝邀请
export function REJECT(data:ACCEPTDataInt) {
  SocketIoData.ACCEPTData.id = '';
  SocketIoData.ACCEPTData.busy = false;
  socket.emit(EMIT_INVITE_REJECT, { ...data });
}
// 通话结束
export function callEnd(ACCEPTData:ACCEPTDataInt){
  socket.emit(EMIT_SIGNAL_END, { ...ACCEPTData });
  SocketIoData.ACCEPTData.busy = false;
}

export async function getUserMedia(constrains?:any) {
  if (window.navigator.mediaDevices.getUserMedia) {
      return window.navigator.mediaDevices.getUserMedia(constrains?constrains:{ video: true });
  } else if (window.navigator.webkitGetUserMedia) {
      return window.navigator.webkitGetUserMedia(constrains?constrains:{ video: true });
  } else if (window.navigator.mozGetUserMedia) {
      return window.navigator.mozGetUserMedia(constrains?constrains:{ video: true });
  } else if (window.navigator.getUserMedia) {
      return window.navigator.getUserMedia(constrains?constrains:{ video: true });
  }
}

import io from 'socket.io-client';
import { reactive } from 'vue';

const VITE_SOCKET_URL: String = import.meta.env.VITE_SOCKET_URL;
const VITE_SOCKET_PATH: String = import.meta.env.VITE_SOCKET_PATH;
import {
  EMIT_UPDATE_USER_LIST,
  EMIT_INVITE,
  EMIT_INVITE_ACCEPT,
  EMIT_INVITE_REJECT,
  EMIT_SIGNAL_START,
  EMIT_SIGNAL_END,
  VIDEO_STREAM,
} from '@/views/Socket/context';
import { SocketIoClass, userDataInt, ACCEPTDataInt } from './SocketIOType';
let socket: any = null;

export function createSocket(query: {}) {
  socket = io(VITE_SOCKET_URL, {
    path: VITE_SOCKET_PATH ? VITE_SOCKET_PATH : '',
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
  socket.on('connect', () => {
    console.log('连接服务器!');
  });
}
// 断开连接
export function disconnectSocket(video?: any) {
  console.log('断开连接');
  socket.close();
  // try {
  video.value.getTracks().forEach((track: { stop: () => void }) => {
    track.stop();
  });
  // } catch (e) {
  //   console.log(e);
  // }
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
export function initiate(data: ACCEPTDataInt, localCameraVideo: any) {
  SocketIoData.ACCEPTData.id = '';
  SocketIoData.ACCEPTData.busy = true;
  console.log(SocketIoData.ACCEPTData.busy);

  socket.emit(EMIT_INVITE_ACCEPT, { ...data });
}
// 拒绝邀请
export function REJECT(data: ACCEPTDataInt) {
  SocketIoData.ACCEPTData.id = '';
  SocketIoData.ACCEPTData.busy = false;
  socket.emit(EMIT_INVITE_REJECT, { ...data });
}
// 通话结束
export function callEnd(ACCEPTData: ACCEPTDataInt) {
  socket.emit(EMIT_SIGNAL_END, { ...ACCEPTData });
  SocketIoData.ACCEPTData.busy = false;
}
const defaultConstrains = {
  video: true,
  audio: false,
};
export async function getUserMedia(constrains?: any) {
  console.log('开始发送');

  const hasGetUserMedia = !!(
    navigator.mediaDevices && navigator.mediaDevices.getUserMedia
  );
  if (hasGetUserMedia) {
    return navigator.mediaDevices.getUserMedia(
      constrains ? constrains : defaultConstrains
    );
  } else {
    let hasMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (hasMedia) {
      return navigator.getUserMedia(
        constrains ? constrains : defaultConstrains
      );
    } else {
      return null;
    }
  }
}

// 推送视频流
export async function sendVideoStream(video?: any, audio?: any) {
  // 开始发送
  console.log('开始发送');

  let stream: MediaStream = await getUserMedia();
  const peer = new RTCPeerConnection();
  if (stream) {
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp9',
    });
    mediaRecorder.ondataavailable = (e) => {
      const blob = e.data;
      // 发送Blob对象
      const reader = new FileReader();
      reader.onloadend = () => {
        const buffer = reader.result;
        socket.binary(true).emit(VIDEO_STREAM, buffer);
      };
      reader.readAsArrayBuffer(blob);
    };
    video.value.srcObject = stream;
    // audio.value.srcObject = stream;
    mediaRecorder.start(1000); // 每1秒录制一次视频
  }
}

// 获取视频流
export function gainVideoStream(
  videoHTml: HTMLVideoElement,
  video?: any,
  audio?: any
) {
  socket.on(VIDEO_STREAM, (data: any) => {
    const videoTrack = data.track;
    const videoStream = new MediaStream();
    videoStream.addTrack(videoTrack);
    video.value.srcObject = videoStream;
  });
}

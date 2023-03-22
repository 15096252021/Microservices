<template>
  <div>
    <el-button size="small" @click="start" type="primary">开始</el-button>
    <el-button size="small" @click="stop" type="primary">暂停</el-button>
    <el-button size="small" @click="login" type="primary">链接</el-button>
    <el-button size="small" @click="loginOut" type="primary">断开</el-button>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue';
import io from 'socket.io-client';
export default defineComponent({
  name: 'socketVue',
  setup() {
    const socket = io('http://192.168.0.104:10065', {
      // path: '/mh/ws',
      // query: {},
      transports: ['websocket','polling'],
      // transports: [''],
      ackTimeout: 30000,
      reconnectionAttempts: 2,
      reconnectionDelay: 2000,
    });
    onMounted(() => {
      console.log('开始链接');
      // 监听 Socket 连接成功事件
      login;
    });
    onUnmounted(() => {
      console.log('关闭链接');
      socket?.close();
    });
    const start = () => {
      console.log('发送消息');

      socket.emit('message', '开始');
    };
    const stop = () => {
      socket.emit('message', '暂停');
    };
    const login = () => {
      if (socket.disconnected) {
        socket.on('connect', () => {
          console.log('Connected to server!');
        });
      }
    };
    const loginOut = () => {
      if (!socket.disconnected) {
        socket.close();
      }
    };
    return {
      start,
      stop,
      login,
      loginOut,
    };
  },
});
</script>

<style scoped></style>

<template>
  <div>
    <div class="video-div">
      <video ref="video" autoplay mirror></video>
      <!-- <audio ref="audio" autoplay></audio> -->
    </div>
    <el-button
      v-show="ACCEPTData.id && !ACCEPTData.busy"
      size="small"
      @click="initiate(ACCEPTData, localCameraVideo)"
      type="primary"
      >接受邀请</el-button
    >
    <el-button
      v-show="ACCEPTData.id && !ACCEPTData.busy"
      size="small"
      @click="REJECT(ACCEPTData)"
      type="primary"
      >拒绝邀请</el-button
    >
    <el-button
      v-show="ACCEPTData.id ? false : ACCEPTData.busy"
      size="small"
      @click="callEnd(ACCEPTData)"
      type="primary"
      >挂断{{ ACCEPTData.busy }}</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, toRefs, ref } from 'vue';
import {
  SocketIoData,
  connectSocket,
  disconnectSocket,
  inviteUser,
  createSocket,
  initiate,
  REJECT,
  callEnd,
  sendVideoStream,
  getUserMedia,
} from './SocketIo';
export default defineComponent({
  name: 'socketVue',
  setup() {
    let localCameraVideo = ref();
    let video = ref();
    let audio = ref();

    onMounted(() => {
      createSocket({ type: 'client' });
      connectSocket();
      sendVideoStream(video, audio);
    });

    onUnmounted(() => {
      disconnectSocket(video);
      
    });
    return {
      connectSocket,
      disconnectSocket,
      inviteUser,
      createSocket,
      initiate,
      ...toRefs(SocketIoData),
      localCameraVideo,
      video,
      audio,
      REJECT,
      callEnd,
    };
  },
});
</script>

<style lang="scss" scoped>
.video-div {
  width: 31.25rem;
  height: 31.25rem;
  background-color: aquamarine;
}
.video-div video {
  transform: scaleX(-1);
}
</style>

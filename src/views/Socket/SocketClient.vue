<template>
  <div>
    <div
      style="width: 31.25rem; height: 31.25rem; background-color: aquamarine">
      <video ref="video" autoplay></video>
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
} from './SocketIo';
export default defineComponent({
  name: 'socketVue',
  setup() {
    let localCameraVideo = ref();
    let video = ref();
    let audio = ref();
    const  initCamera = async () =>{
      try {
        let stream
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true,audio:true })
        } else {
          stream = await navigator.getUserMedia({ video: true,audio:true })
        }
        video.value.srcObject = stream
        audio.value.srcObject = stream
        console.log(video.value);
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      createSocket({ type: 'client' });
      connectSocket();
      initCamera()
    });

    onUnmounted(() => {
      disconnectSocket();
    });
    const initCameraAndMicrophone = () => {
      try {
        const stream = navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        console.log(stream);

        video.value.srcObject = stream;
        audio.value.srcObject = stream;
      } catch (error) {
        console.error(error);
      }
    };
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
      initCameraAndMicrophone,
      REJECT,
      callEnd,
    };
  },
});
</script>

<style scoped></style>

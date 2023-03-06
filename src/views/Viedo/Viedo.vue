<template>
  <div class="videoClass">
    <el-input v-model="url" placeholder="视频流地址" />
    <el-button type="primary" @click="play">播放</el-button>
    <video id="videoElement" controls autoplay muted></video>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import flvjs from 'flv.js';

export default defineComponent({
  name: 'Aside',
  setup() {
    let flvPlayer: flvjs.Player | null = null;
    const play = () => {
      console.log(url.value);

      if (flvPlayer) {
        flvPlayer.destroy();
        console.log(flvjs.isSupported());

        if (flvjs.isSupported()) {
          var videoElement = document.getElementById(
            'videoElement'
          ) as HTMLMediaElement;
          flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: url.value, // 自己的flv视频流
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      } else {
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById(
            'videoElement'
          ) as HTMLMediaElement;
          flvPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: url.value, // 自己的flv视频流
          });
          flvPlayer.attachMediaElement(videoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      }
    };
    const url = ref(
      'http://36.35.240.148:7886/live/cameraid/1000003%243/substream/1.flv'
    );
    const url1 =
      'https://czmhns.zhihuitianyan.cn:9443/live/482@20230306142537909.flv';
    onMounted(() => {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById(
          'videoElement'
        ) as HTMLMediaElement;
        flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: false,
          url: url.value, // 自己的flv视频流
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
      }
    });
    return {
      flvPlayer,
      play,
      url,
    };
  },
});
</script>

<style lang="scss" scoped>
.videoClass {
  height: 100%;
  width: 100%;
  .el-input {
    width: 80%;
  }
  .el-button {
    width: 10%;
    align-content: left;
  }
}
.videoClass video {
  height: calc(100% - 80px);
  width: calc(100% - 20px);
}
</style>

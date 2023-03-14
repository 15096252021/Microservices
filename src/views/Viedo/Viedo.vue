<template>
  <!-- <div class="videoClass"> -->
  <el-row :span="24" :gutter="5">
    <el-col :span="22">
      <el-input v-model="url" placeholder="视频流地址" />
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="play">播放</el-button>
    </el-col>
  </el-row>
  <el-row :span="24">
    <el-col :span="24">
      <video
        id="videoElement"
        class="videoClass"
        controls
        autoplay
        muted></video>
    </el-col>
  </el-row>
  <!-- </div> -->
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import flvjs from 'flv.js';

export default defineComponent({
  name: 'Aside',
  setup() {
    let flvPlayer: flvjs.Player | null = null;
    const play = () => {
      if (flvPlayer) {
        flvPlayer.destroy();
        if (flvjs.isSupported()) {
          var videoElement = document.getElementById(
            'videoElement'
          ) as HTMLMediaElement;
          flvPlayer = flvjs.createPlayer({
            type: 'm3u8',
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
            type: 'm3u8',
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
    onMounted(() => {
      if (flvPlayer) {
        flvPlayer.destroy();
      }
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
.el-row {
  margin-bottom: 0.3125rem;
  .videoClass {
    height: 100%;
    width: 100%;
    display: block;
  }
  .el-col {
    width: 100%;
    height: 100%;
    .el-button {
      max-width: 100%;
      min-width: 1.875rem;
    }
  }
}
.el-row:first-child {
  height: 1.875rem;
  width: calc(100% - 0.3125rem);
}
.el-row:last-child {
  height: calc(100% - 1.875rem - 2 * 0.3125rem);
  width: calc(100% - 0.3125rem);
  margin-bottom: 0;
}
</style>

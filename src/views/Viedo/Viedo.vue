<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="width:1000px; height:200px; overflow-x:scroll;">
    <table border="1" rules="all" class="testtable">
      <thead>
        <tr>
          <th>ID</th>
          <th>标题</th>
          <th>简介</th>
          <th>作者</th>
          <th>库存</th>
          <th>价格</th>
          <th>销量</th>
          <th>备注</th>
          <th>阅读数</th>
          <th>点赞数</th>
          <th>收藏数</th>
          <th>评论数</th>
          <th>发布时间</th>
          <th>修改时间</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>1</td>
        <td>这是一篇标题很长的文章用来测试表格的测试标题</td>
        <td>这是一篇标题很长的文章用来测试表格不被太多列挤得变形的描述...</td>
        <td>管理员</td>
        <td>3000</td>
        <td>120.68</td>
        <td>1200</td>
        <td>测试啊测试test</td>
        <td>123</td>
        <td>20</td>
        <td>17</td>
        <td>5</td>
        <td>2018-03-06 12:00:00</td>
        <td>2018-03-07 15:00:00</td>
      </tr>
      <tr>
        <td>1</td>
        <td>这是一篇标题很长的文章用来测试表格的测试标题</td>
        <td>这是一篇标题很长的文章用来测试表格不被太多列挤得变形的描述...</td>
        <td>管理员</td>
        <td>3000</td>
        <td>120.68</td>
        <td>1200</td>
        <td>测试啊测试test</td>
        <td>123</td>
        <td>20</td>
        <td>17</td>
        <td>5</td>
        <td>2018-03-06 12:00:00</td>
        <td>2018-03-07 15:00:00</td>
      </tr>
    </tbody>

    </table>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
import flvjs from 'flv.js'

export default defineComponent({
  setup() {
    let flvPlayer: flvjs.Player | null = null;
    // 创建和销毁video
    const createVideo = () => {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('video') as HTMLMediaElement;
        flvPlayer = flvjs.createPlayer(
          {
            type: 'flv',
            isLive: true,
            url:
              'http://36.35.240.148:7886/live/cameraid/1000003%242/substream/1.flv'
          }
        )
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        flvPlayer.play()
        // 报错重连
        // flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
        //   console.log('errorType:', errType)
        //   console.log('errorDetail:', errDetail)
        //   if (flvPlayer) {
        //     destoryVideo()
        //     createVideo()
        //   }
        // })
      }
    }
    const destoryVideo = () => {
      if (flvPlayer) {
        flvPlayer.pause()
        flvPlayer.unload()
        flvPlayer.detachMediaElement()
        flvPlayer.destroy()
        flvPlayer = null
      }

    }
    onMounted(() => {
      createVideo();
    });
    onUnmounted(() => {
      destoryVideo();
    })
    return {
      createVideo, destoryVideo
    }
  }

})
</script>

<style lang="scss" scoped>
.testtable {
  min-width: 100px;
  height: 100px;

  text-align: center;

  td {
    min-width:500px;
  }
}
</style>
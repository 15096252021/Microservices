<template>
  <div style="display: flex">
    <div style="width: 500px; height: 450px">
      <input v-model="msg" />
      <h2>这是一个测试页面</h2>
      <h2>{{ msg }}</h2>
    </div>
    <div style="width: 500px; height: 450px">
      <VideoCom  videoId="v1"></VideoCom>
    </div>
    <div style="width: 500px; height: 450px">
      <VideoCom videoId="v2"></VideoCom>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VideoCom from '@/views/Viedo/Viedo.vue';
export default defineComponent({
  name: 'Home_page',
  setup() {
    let msg = ref('测试');
    return {
      msg,
    };
  },
  components: {
    VideoCom
  },
});
</script>

<style scoped></style>

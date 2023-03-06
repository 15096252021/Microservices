<template>
  <div>
    <input v-model="msg" />
    <h2>这是一个测试页面</h2>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Home_page',
  setup() {
    let msg = ref('测试');
    return {
      msg,
    };
  },
});
</script>

<style scoped></style>

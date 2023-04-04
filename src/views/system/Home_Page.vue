<template>
  <div class="Home_Page_Body">
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref } from 'vue';
import Viedo from '../Viedo/Viedo.vue';
export default defineComponent({
  name: 'Home_page',
  setup() {
    let msg = ref('测试');
    return {
      msg,
    };
  },
  
  components: {
    Viedo,
  },
});
</script>

<style lang="scss" scoped>
.Home_Page_Body {
  width: 100%;
  height: 100%;
  background-color: #f0f;
}
</style>

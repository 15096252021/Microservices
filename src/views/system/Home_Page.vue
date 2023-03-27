<template>
  <div class="Home_Page_Body">
    <div style="width: 500px; height: 500px">
      <Viedo videoId="js120"></Viedo>
    </div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
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

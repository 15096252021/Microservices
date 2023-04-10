<template>
  <div class="Home_Page_Body">
    <div></div>
    <div style="height: 500px; width: 500px; background-color: aliceblue">
      <imageVue :filepath="filepath" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, unref } from 'vue';
import Viedo from '../Viedo/Viedo.vue';
import imageVue from '@/components/common/image/image.vue';
export default defineComponent({
  name: 'Home_page',
  setup() {
    let filepath = ref('UpFile/R.jpg');
    let msg = ref('测试');
    return {
      msg,
      filepath,
    };
  },

  components: {
    Viedo,
    imageVue,
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

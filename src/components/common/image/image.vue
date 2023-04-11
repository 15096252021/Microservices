<template>
  <div class="imageDiv">
    <img :src="imageUrl" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup(props) {
    let imageUrl = ref('');
    let filepath = props.filepath;
    imageUrl.value = '/imageapi/File/ShowImages?filepath=' + filepath || '';
    return { imageUrl };
  },
  props: {
    filepath: String,
  },
});
</script>

<style lang="scss" scoped>
.imageDiv {
  height: 100%;
  width: 100%;
}
.imageDiv img {
  height: 100%;
  width: 100%;
}
</style>

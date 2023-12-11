<template>
  <div id="test001"></div>
</template>

<script lang="ts">
import { defineComponent,onMounted } from 'vue';
import  '@/assets/js/wxLogin.js';
export default defineComponent({
  setup() {
    onMounted(() => {
    //   var obj = new WxLogin({
    //   self_redirect: true,
    //   id: 'test001',
    //   appid: 'wx3f741a5565960577',
    //   scope: 'snsapi_login',
    //   redirect_uri: '',
    //   state: '',
    //   style: 'black',
    //   href: '',
    // });
    })

    return {
      
    };
  },
});
</script>

<style scoped></style>

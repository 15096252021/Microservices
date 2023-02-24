<template>
  <router-view v-if="isRouterAlive" />
</template>
<script lang="ts">
import { defineComponent, nextTick, ref, provide } from 'vue';

export default defineComponent({
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(function () {
        isRouterAlive.value = true;
      });
    };
    provide('reload', reload);
    return {
      isRouterAlive,
      reload,
    };
  },
});
</script>

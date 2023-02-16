<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-c">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">11</el-aside>
        <el-main>Main
          <h2>{{ name }}</h2>
          <button @click="chageName">改变name</button>
        </el-main>
      </el-container>
    </el-container>
</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import Header from "@/views/Home/Header.vue"
import { storeToRefs } from 'pinia'
import { useStore } from '@/store';
export default defineComponent({
  setup() {
    const store = useStore();
    const { name } = storeToRefs(store);
    const chageName = () => {
      name.value = "大厦大家撒谎的骄傲和时间";
    }
    
    return {
      name, chageName
    }
  },
  components: {
    Header
  }
})
</script>

<style lang="scss" scoped>
.header-c {
  background-color: #f0f0f0;
}</style>